import { Body, Controller, Get, Post } from '@nestjs/common'
import { type ProfileResponse, UpdateProfileRequestSchema } from '@repo/common'
import { UserService } from '@repo/domain'
import { createZodDto } from 'nestjs-zod'

import { type ActiveUser, CurrentUser } from '../auth'

class UpdateProfileRequestDto extends createZodDto(UpdateProfileRequestSchema) {}

@Controller('profile')
export class ProfileController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getProfile(@CurrentUser() activeUser: ActiveUser): Promise<ProfileResponse> {
    const user = await this.userService.findOne({ id: activeUser.id })
    if (!user) {
      throw new Error('User not found')
    }

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }

  @Post()
  async updateProfile(
    @CurrentUser() activeUser: ActiveUser,
    @Body() dto: UpdateProfileRequestDto
  ): Promise<ProfileResponse> {
    const updatedUser = await this.userService.update(
      { id: activeUser.id },
      {
        ...dto,
        updatedBy: activeUser.id,
      }
    )
    if (!updatedUser) {
      throw new Error('User not found')
    }

    return {
      id: updatedUser.id,
      email: updatedUser.email,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    }
  }
}
