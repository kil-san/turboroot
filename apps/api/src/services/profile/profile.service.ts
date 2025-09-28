import { Injectable } from '@nestjs/common'
import { Profile } from './profile.types'

@Injectable()
export class ProfileService {
  private profile: Profile

  constructor() {
    this.profile = {
      firstName: 'John',
      lastName: 'Doe',
    }
  }

  getProfile(): Profile {
    return this.profile
  }

  updateProfile(profile: Profile): Profile {
    this.profile = profile
    return this.profile
  }
}
