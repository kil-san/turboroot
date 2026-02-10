import { Module } from '@nestjs/common'
import { ConfigModule, ConfigType } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import DatabaseConfig from './database.config'
import { TypeOrmUserRepository, UserEntity } from './entities'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(DatabaseConfig)],
      useFactory: (config: ConfigType<typeof DatabaseConfig>) => {
        return {
          type: 'postgres',
          host: config.host,
          port: config.port,
          username: config.username,
          password: config.password,
          database: config.database,
          ssl: config.ssl,
          synchronize: false,
          schema: 'public',
          entities: [UserEntity],
        }
      },
      inject: [DatabaseConfig.KEY],
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [TypeOrmUserRepository],
  exports: [TypeOrmUserRepository],
})
export class DatabaseModule {}
