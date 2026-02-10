import { Column, Entity } from 'typeorm'

import { BaseEntity } from '../../base.entity'

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity<UserEntity> {
  @Column({ name: 'email', unique: true })
  email: string

  @Column({ name: 'password_hash' })
  passwordHash: string

  @Column({ name: 'first_name' })
  firstName: string

  @Column({ name: 'last_name' })
  lastName: string
}
