import { Module } from '@nestjs/common'
import { ConfigModule, ConfigType } from '@nestjs/config'
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { DatabaseModule, TypeOrmUserRepository } from '@repo/database'
import { UserService } from '@repo/domain'

import AuthConfig from './auth.config'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtAuthGuard } from './jwt.guard'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule.forFeature(AuthConfig),
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(AuthConfig)],
      useFactory: (config: ConfigType<typeof AuthConfig>): JwtModuleOptions => {
        return {
          secret: config.jwtSecret,
          signOptions: { expiresIn: config.jwtExpiration as any },
        }
      },
      inject: [AuthConfig.KEY],
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: UserService,
      useFactory: (repo: TypeOrmUserRepository) => new UserService(repo),
      inject: [TypeOrmUserRepository],
    },
    AuthService,
    JwtStrategy,
    JwtAuthGuard,
  ],
  exports: [AuthService, JwtAuthGuard],
})
export class AuthModule {}
