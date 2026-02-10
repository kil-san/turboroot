import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export abstract class BaseEntity<T> {
  constructor(partial: Omit<T, 'id'> & { id?: number }) {
    Object.assign(this, partial)
  }

  @PrimaryGeneratedColumn('increment')
  id: number

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date

  @Column({ name: 'created_by' })
  createdBy: number

  @Column({ name: 'updated_by' })
  updatedBy: number
}
