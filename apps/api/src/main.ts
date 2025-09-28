import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { AppConfigOptions } from 'app.config'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  const configService = app.get(ConfigService)
  const config = configService.get<AppConfigOptions>('app') as AppConfigOptions
  await app.listen(config.port)
}
bootstrap()
