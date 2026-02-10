import * as z from 'zod'

export const UpdateProfileRequestSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
})

export const ProfileResponseSchema = z.object({
  id: z.number(),
  email: z.email(),
  firstName: z.string(),
  lastName: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type ProfileResponse = z.infer<typeof ProfileResponseSchema>
export type UpdateProfileRequest = z.infer<typeof UpdateProfileRequestSchema>
