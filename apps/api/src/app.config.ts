import { registerAs } from '@nestjs/config'
import * as zod from 'zod'

export type AppConfigOptions = {
  port: number
}

export default registerAs<AppConfigOptions>('app', () => {
  const schema = zod.object({
    APP_PORT: zod.coerce.number(),
  })

  const result = schema.safeParse(process.env)

  if (result.error) {
    throw new Error(`Config validation error: ${result.error.message}. Is there an environment variable missing?`)
  }

  return {
    port: result.data.APP_PORT,
  }
})
