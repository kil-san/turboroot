import { Model } from '../model'

export type Where<T> = {
  [P in keyof T]?: T[P] extends object ? T[P] | Where<T[P]> : T[P]
}

type DefaultOmit = 'id' | 'createdAt' | 'updatedAt'

export type CreatePayload<T> = Omit<T, DefaultOmit>

export type UpdatePayload<T> = Omit<Partial<T>, DefaultOmit>

export interface Repository<T extends Model> {
  find(where: Where<T>): Promise<T | undefined>
  findAll(where: Where<T>): Promise<T[]>
  create(data: CreatePayload<T>): Promise<T>
  update(where: Where<T>, data: UpdatePayload<T>): Promise<T | undefined>
  updateAll(where: Where<T>, data: UpdatePayload<T>): Promise<T[]>
  delete(where: Where<T>): Promise<void>
}
