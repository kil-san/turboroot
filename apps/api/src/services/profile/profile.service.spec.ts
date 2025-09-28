import { Test, TestingModule } from '@nestjs/testing'
import { ProfileService } from './profile.service'

describe('HelloService', () => {
  let service: ProfileService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [ProfileService],
    }).compile()

    service = app.get<ProfileService>(ProfileService)
  })

  describe('getProfile', () => {
    it('should return default profile', () => {
      expect(service.getProfile()).toBe({ firstName: 'John', lastName: 'Doe' })
    })
  })

  describe('updateProfile', () => {
    it('should return updated profile', () => {
      expect(
        service.updateProfile({
          firstName: 'Jane',
          lastName: 'Doe',
        })
      ).toBe({ firstName: 'Jane', lastName: 'Doe' })
    })
  })
})
