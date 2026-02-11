export type FindUserWherePayload =
  | {
      email: string

      id?: string
    }
  | {
      id: string
      email?: string
    }

export type CreateUserPayload = {
  email: string
  passwordHash: string
  firstName: string
  lastName: string
}

export type UpdateUserPayload = {
  firstName: string
  lastName: string
  updatedBy: string
}
