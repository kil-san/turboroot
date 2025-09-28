import * as z from 'zod'

export const UpdateProfileRequestSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
})

export const ProfileResponseSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
})

export type UpdateProfileRequest = z.infer<typeof UpdateProfileRequestSchema>
export type ProfileResponse = z.infer<typeof ProfileResponseSchema>
