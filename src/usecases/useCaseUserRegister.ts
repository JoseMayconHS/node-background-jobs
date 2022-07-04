import { UserRepository, UserRepositoryCreateData } from '@repository/UserRepository';
import { QueueLib } from '@lib/queue/QueueLib';

interface ExecuteData {
  user: UserRepositoryCreateData
}

export class UseCaseUserRegister {
  constructor(
    private userRepository: UserRepository,
    private libQueue: QueueLib
  ) {}

  async execute(data: ExecuteData): Promise<void> {
    const { user } = data

    if (!user.email || !user.name) {
      throw new Error('Email ou nome estão ausentes')
    }

    await this.userRepository.create(user)

    await this.libQueue.mail.queue.add({
      subject: 'Novo Usuário !!',
      body: [
        `<p>Nome: ${ user.name }</p>`,
        `<p>E-mail: ${ user.email }</p>`,
      ]
    })
  }
}
