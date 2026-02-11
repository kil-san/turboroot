import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export abstract class BaseEntity<T> {
  constructor(partial: Omit<T, 'id'> & { id?: string }) {
    Object.assign(this, partial)
  }

  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date

  @Column({ name: 'created_by', type: 'uuid' })
  createdBy: string

  @Column({ name: 'updated_by', type: 'uuid' })
  updatedBy: string
}
