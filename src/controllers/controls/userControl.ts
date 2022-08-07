import { Application, Request, Response } from 'express'

import { UserRepository } from '@repositories/userRepository'
import { queueService } from '@services/queue'
import { UseCaseUserRegister } from '@usecases/useCaseUserRegister'

const store = async (req: Request, res: Response) => {
	try {
		interface Body {
			name: string
			email: string
		}

		const { name, email } = req.body as Body

		const userRepository = new UserRepository()

		const useCaseUserRegister = new UseCaseUserRegister(
			userRepository,
			queueService
		)

		await useCaseUserRegister.execute({
			user: {
				name,
				email,
			},
		})

		res.json({
			ok: true,
		})
	} catch (e) {
		res.status(400).send(e.message)
	}
}

export const userController = (app: Application) => {
	app.post('/user', store)
}
