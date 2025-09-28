import { Module } from '@nestjs/common'
import { ProfileControllerModule } from './profile/profile.controller.module'

@Module({
  imports: [ProfileControllerModule],
})
export class ControllerModule {}
