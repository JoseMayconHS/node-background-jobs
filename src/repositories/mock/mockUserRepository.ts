import { UserRepository, UserRepositoryCreateData } from '../UserRepository'

export class MockUserRepository implements UserRepository {
	async create(data: UserRepositoryCreateData): Promise<void> {
		console.log('Usuário criado - ', data.name)
	}
}
