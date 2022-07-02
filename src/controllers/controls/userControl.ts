import { Application, Request, Response } from "express";

import { UseCaseUserRegister } from '@usecases/useCaseUserRegister'

import { MockUserRepository } from '@repository/mock/mockUserRepository';
import { NodemailerLibMail } from "@lib/mail/nodemailer/NodemailerLibMail";
import { RedisLib } from '@lib/inMemory/redis/RedisLib';

const store = async (req: Request, res: Response) => {
  try {
    interface Body {
      name: string, email: string
    }

    const { name, email } = req.body as Body

    const mailLib = new NodemailerLibMail()

    const userRepository = new MockUserRepository()

    const inMemory = new RedisLib(1)

    const useCaseUserRegister = new UseCaseUserRegister(
      userRepository, mailLib, inMemory
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

const index = async (req: Request, res: Response) => {
  interface Query {
    key?: string
  }

  try {
    const { key } = req.query as Query

    if (!key) {
      throw new Error('Chave inválida')
    }

    const inMemory = new RedisLib(1)

    const item = await inMemory.getItem(key)

    res.status(200).json({
      data: item
    })
  } catch(e) {
    res.status(400).send(e.message)
  }
}

export const userController = (app: Application) => {
  app.get('/user', index)
  app.post('/user', store)
}
