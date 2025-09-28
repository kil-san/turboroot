import { Test, TestingModule } from '@nestjs/testing'
import { ProfileController } from './profile.controller'
import { ProfileService } from '@services/profile'
import { createMock, DeepMocked } from '@golevelup/ts-jest'

describe('ProfileController', () => {
  let controller: ProfileController
  let mockProfileService: DeepMocked<ProfileService>

  beforeEach(async () => {
    mockProfileService = createMock<ProfileService>()

    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [{ provide: ProfileService, useValue: mockProfileService }],
    }).compile()

    controller = app.get<ProfileController>(ProfileController)
  })

  describe('getProfile', () => {
    it('should return profile', () => {
      const expected = { firstName: 'John', lastName: 'Doe' }
      mockProfileService.getProfile.mockReturnValue(expected)
      expect(controller.getProfile()).toMatchObject(expected)
    })
  })

  describe('updateProfile', () => {
    it('should return updated profile', () => {
      const expected = { firstName: 'Jane', lastName: 'Doe' }
      mockProfileService.updateProfile.mockReturnValue(expected)
      expect(controller.updateProfile({ firstName: 'Jane', lastName: 'Doe' })).toMatchObject(expected)
    })
  })
})
