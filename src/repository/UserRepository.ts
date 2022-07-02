export interface User {
  name: string
  email: string
  id: number
}

export type UserRepositoryCreateData = Omit<User, 'id'>

export interface UserRepository {
  create(data: UserRepositoryCreateData): Promise<void>
}
