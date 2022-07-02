import { MockUserRepository } from '@repository/mock/mockUserRepository';
import { Application, Request, Response } from "express";

import { UseCaseUserRegister } from '@usecases/useCaseUserRegister'
import { NodemailerLibMail } from "@lib/mail/nodemailer/NodemailerLibMail";

const post = async (req: Request, res: Response) => {
  try {
    interface Body {
      name: string, email: string
    }

    const { name, email } = req.body as Body

    const mailLib = new NodemailerLibMail()

    const userRepository = new MockUserRepository()

    const useCaseUserRegister = new UseCaseUserRegister(
      userRepository, mailLib
    )

    await useCaseUserRegister.execute({
      user: {
        name, email
      }
    })

    res.json({
      ok: true
    })
  } catch(e) {
    res.status(400).send(e.message)
  }
}

const get = async (req: Request, res: Response) => {
  res.send('User Controller get Ok')
}

export const userController = (app: Application) => {
  app.get('/user', get)
  app.post('/user', post)
}
