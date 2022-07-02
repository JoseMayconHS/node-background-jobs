import { UserRepository, UserRepositoryCreateData } from "../UserRepository";

export class MockUserRepository implements UserRepository {
  create(data: UserRepositoryCreateData): Promise<void> {
    return Promise.resolve()
  }
}
