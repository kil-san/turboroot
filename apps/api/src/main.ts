import 'reflect-metadata'

import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import cookieParser from 'cookie-parser'

import { AppConfigOptions } from './app.config'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(cookieParser())
  const configService = app.get(ConfigService)
  const config = configService.get<AppConfigOptions>('app') as AppConfigOptions
  app.enableCors({
    origin: config.corsOrigin?.split(',').map((origin) => origin.trim()),
    credentials: true,
  })
  await app.listen(config.port)
}
bootstrap()
