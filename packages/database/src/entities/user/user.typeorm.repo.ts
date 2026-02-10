import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators'
import { CreateUserData, FindUserWhere, UpdateUserData, User, UserRepository } from '@repo/domain'
import { Repository } from 'typeorm'

import { UserEntity } from './user.entity'

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>
  ) {}

  private toUser(entity: UserEntity): User {
    return {
      id: entity.id,
      email: entity.email,
      passwordHash: entity.passwordHash,
      firstName: entity.firstName,
      lastName: entity.lastName,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      createdBy: entity.createdBy,
      updatedBy: entity.updatedBy,
    }
  }

  async find(where: FindUserWhere): Promise<User | undefined> {
    const entity = await this.repository.findOne({
      where: {
        id: where.id,
        email: where.email,
      },
    })

    if (!entity) {
      return undefined
    }

    return this.toUser(entity)
  }

  async findAll(where: FindUserWhere): Promise<User[]> {
    const entities = await this.repository.find({
      where: {
        id: where.id,
        email: where.email,
      },
    })

    return entities.map((entity) => this.toUser(entity))
  }

  async create(data: CreateUserData): Promise<User> {
    const newUser = this.repository.create({
      ...data,
      createdBy: 0,
      updatedBy: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    await this.repository.save(newUser)
    return this.toUser(newUser)
  }

  async update(where: FindUserWhere, data: UpdateUserData): Promise<User | undefined> {
    const existingUser = await this.repository.findOne({ where: { id: where.id, email: where.email } })
    if (!existingUser) {
      return undefined
    }

    const mergedUser = this.repository.merge(existingUser, {
      ...data,
      updatedAt: new Date(),
    })

    const updatedUser = await this.repository.save(mergedUser)
    return this.toUser(updatedUser)
  }

  async updateAll(where: FindUserWhere, data: UpdateUserData): Promise<User[]> {
    const existingUsers = await this.repository.find({ where: { id: where.id, email: where.email } })
    if (!existingUsers.length) {
      return []
    }

    const updatedUsers = existingUsers.map((user) => {
      return this.repository.merge(user, {
        ...data,
        updatedAt: new Date(),
      })
    })

    const result = await this.repository.save(updatedUsers)
    return result.map((entity) => this.toUser(entity))
  }

  async delete(where: FindUserWhere): Promise<void> {
    await this.repository.delete({ id: where.id, email: where.email })
  }
}
