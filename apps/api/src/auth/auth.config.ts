import { registerAs } from '@nestjs/config'
import * as z from 'zod'

export type AuthConfigOptions = {
  jwtSecret: string
  jwtExpiration: string
}

export default registerAs<AuthConfigOptions>('auth', () => {
  const schema = z.object({
    JWT_EXPIRATION: z.string(),
    JWT_SECRET: z.string(),
  })

  const result = schema.safeParse(process.env)

  if (!result.success) {
    throw new Error(`Auth Config Validation Error: ${result.error.message}`)
  }

  return {
    jwtExpiration: result.data.JWT_EXPIRATION,
    jwtSecret: result.data.JWT_SECRET,
  }
})
