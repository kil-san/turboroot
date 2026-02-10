import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { DatabaseModule } from '@repo/database'
import { ZodSerializerInterceptor, ZodValidationPipe } from 'nestjs-zod'

import AppConfig from './app.config'
import { AuthModule } from './auth'
import { JwtAuthGuard } from './auth/jwt.guard'
import { ProfileModule } from './profile'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development'],
      load: [AppConfig],
    }),
    AuthModule,
    ProfileModule,
    DatabaseModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ZodSerializerInterceptor,
    },
  ],
})
export class AppModule {}
