import { UserRepository, UserRepositoryCreateData } from '@repository/UserRepository';
import { LibMail } from "@lib/mail/MailLib";
import { InMemoryLib } from '@lib/inMemory/InMemoryLib';

interface ExecuteData {
  user: UserRepositoryCreateData
}

export class UseCaseUserRegister {
  constructor(
    private userRepository: UserRepository,
    private libMail: LibMail,
    private inMemory: InMemoryLib
  ) {}

  async execute(data: ExecuteData): Promise<void> {
    const { user } = data

    if (!user.email || !user.name) {
      throw new Error('Email ou nome estão ausentes')
    }

    await this.userRepository.create(user)

    // ENVIAR EMAIL EM BACKGROUND

    await this.inMemory.setItem({ key: user.name, value: user.email })

    await this.libMail.sendMail({
      subject: 'Novo Usuário !!',
      body: [
        `<p>Nome: ${ user.name }</p>`,
        `<p>E-mail: ${ user.email }</p>`,
      ]
    });
  }
}
