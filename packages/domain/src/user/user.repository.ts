import { CreatePayload, Repository, UpdatePayload, Where } from '@repo/common'

import { User } from './user.models'

export type CreateUserData = CreatePayload<User>

export type FindUserWhere = Where<User>

export type UpdateUserData = UpdatePayload<User>

export interface UserRepository extends Repository<User> {}
