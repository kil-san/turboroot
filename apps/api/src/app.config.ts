import { registerAs } from '@nestjs/config'
import * as zod from 'zod'

export type AppConfigOptions = {
  port: number
  corsOrigin?: string
  isProduction: boolean
}

export default registerAs<AppConfigOptions>('app', () => {
  const schema = zod.object({
    APP_PORT: zod.coerce.number(),
    APP_CORS_ORIGIN: zod.string().optional(),
    NODE_ENV: zod.enum(['development', 'staging', 'test', 'production']).default('production'),
  })

  const result = schema.safeParse(process.env)

  if (result.error) {
    throw new Error(`Config validation error: ${result.error.message}. Is there an environment variable missing?`)
  }

  return {
    port: result.data.APP_PORT,
    corsOrigin: result.data.APP_CORS_ORIGIN,
    isProduction: result.data.NODE_ENV === 'production',
  }
})
