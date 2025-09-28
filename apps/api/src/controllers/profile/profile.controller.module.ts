import { Module } from '@nestjs/common'
import { ProfileController } from './profile.controller'
import { ProfileServiceModule } from 'services/profile'

@Module({
  imports: [ProfileServiceModule],
  controllers: [ProfileController],
})
export class ProfileControllerModule {}
