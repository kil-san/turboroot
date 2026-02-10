import { Model } from '@repo/common'

export interface User extends Model {
  email: string
  passwordHash: string
  firstName: string
  lastName: string
}
