import { Module } from '@nestjs/common'
import { DatabaseModule, TypeOrmUserRepository } from '@repo/database'
import { UserService } from '@repo/domain'

import { ProfileController } from './profile.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [ProfileController],
  providers: [
    {
      provide: UserService,
      useFactory: (repo: TypeOrmUserRepository) => new UserService(repo),
      inject: [TypeOrmUserRepository],
    },
  ],
})
export class ProfileModule {}
