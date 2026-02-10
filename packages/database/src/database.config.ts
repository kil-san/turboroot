import { registerAs } from '@nestjs/config'
import * as z from 'zod'

export type DatabaseConfigOptions = {
  host: string
  port: number
  username: string
  password: string
  database: string
  ssl: boolean
}

export default registerAs<DatabaseConfigOptions>('database', () => {
  const schema = z.object({
    DB_HOST: z.string(),
    DB_PORT: z.string(),
    DB_USERNAME: z.string(),
    DB_PASSWORD: z.string(),
    DB_DATABASE: z.string(),
    DB_SSL: z.string(),
  })

  const result = schema.safeParse(process.env)

  if (!result.success) {
    throw new Error(`Config validation error: ${result.error.message}. Is there an environment variable missing?`)
  }

  return {
    host: result.data.DB_HOST,
    port: parseInt(result.data.DB_PORT, 10),
    username: result.data.DB_USERNAME,
    password: result.data.DB_PASSWORD,
    database: result.data.DB_DATABASE,
    ssl: result.data.DB_SSL.trim().toLowerCase() === 'true',
  }
})
