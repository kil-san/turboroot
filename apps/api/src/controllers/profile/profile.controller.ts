import { BadRequestException, Body, Controller, Get, Post, UsePipes } from '@nestjs/common'
import { ProfileService } from '@services/profile'
import { UpdateProfileRequestSchema, type UpdateProfileRequest, type ProfileResponse } from '@repo/types/dto'
import { ZodValidationPipe } from 'nestjs-zod'

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
  @UsePipes(new ZodValidationPipe(UpdateProfileRequestSchema))
  updateProfile(@Body() payload: UpdateProfileRequest): ProfileResponse {
    const profile = this.profileService.updateProfile(payload)

    return {
      firstName: profile.firstName,
      lastName: profile.lastName,
    }
  }
}
