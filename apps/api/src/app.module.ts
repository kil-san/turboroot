import { Module } from '@nestjs/common'
import { ControllerModule } from './controllers/controller.module'
import { ConfigModule } from '@nestjs/config'
import AppConfig from './app.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development'],
      load: [AppConfig],
    }),
    ControllerModule,
  ],
})
export class AppModule {}
