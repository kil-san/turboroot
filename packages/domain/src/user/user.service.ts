import { User } from './user.models'
import { UserRepository } from './user.repository'
import { CreateUserPayload, FindUserWherePayload, UpdateUserPayload } from './user.types'

export class UserService {
  constructor(private readonly usersRepository: UserRepository) {}

  async findOne(where: FindUserWherePayload): Promise<User | undefined> {
    const user = await this.usersRepository.find(where)
    return user
  }

  async create(data: CreateUserPayload): Promise<User> {
    const newUser = this.usersRepository.create({
      ...data,
      createdBy: 0,
      updatedBy: 0,
    })
    return newUser
  }

  async update(where: FindUserWherePayload, data: UpdateUserPayload): Promise<User | undefined> {
    const updatedUser = await this.usersRepository.update(where, data)
    return updatedUser
  }
}
