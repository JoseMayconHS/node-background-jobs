import { UserRepository, UserRepositoryCreateData } from '@repository/UserRepository';
import { LibMail } from "@lib/mail/MailLib";

interface ExecuteData {
  user: UserRepositoryCreateData
}

export class UseCaseUserRegister {
  constructor(
    private userRepository: UserRepository,
    private libMail: LibMail
  ) {}

  async execute(data: ExecuteData): Promise<void> {
    const { user } = data

    if (!user.email || !user.name) {
      throw new Error('Email ou nome estão ausentes')
    }

    await this.userRepository.create(user)

    await this.libMail.sendMail({
      subject: 'Novo Feedback !!',
      body: [
        `<p>Nome: ${ user.name }</p>`,
        `<p>E-mail: ${ user.email }</p>`,
      ]
    });
  }
}
