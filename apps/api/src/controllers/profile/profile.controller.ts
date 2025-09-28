import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common'
import { ProfileService } from '@services/profile'
import { UpdateProfileRequestSchema, type UpdateProfileRequest, type ProfileResponse } from '@repo/types/dto'

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  getProfile(): ProfileResponse {
    const profile = this.profileService.getProfile()

    return {
      firstName: profile.firstName,
      lastName: profile.lastName,
    }
  }

  @Post()
  updateProfile(@Body() payload: UpdateProfileRequest): ProfileResponse {
    const result = UpdateProfileRequestSchema.safeParse(payload)
    if (!result.success) {
      throw new BadRequestException(result.error.message)
    }
    const profile = this.profileService.updateProfile(result.data)

    return {
      firstName: profile.firstName,
      lastName: profile.lastName,
    }
  }
}
