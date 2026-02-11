import * as z from 'zod'

export const SignupRequestSchema = z.object({
  email: z.email(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
})

export const SignupResponseSchema = z.object({
  id: z.uuidv4(),
  email: z.email(),
  firstName: z.string(),
  lastName: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const SigninRequestSchema = z.object({
  email: z.email(),
  password: z.string(),
})

export const SigninResponseSchema = z.object({
  accessToken: z.string(),
})

export type SigninRequest = z.infer<typeof SigninRequestSchema>
export type SigninResponse = z.infer<typeof SigninResponseSchema>
export type SignupRequest = z.infer<typeof SignupRequestSchema>
export type SignupResponse = z.infer<typeof SignupResponseSchema>
