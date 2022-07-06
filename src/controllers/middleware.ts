import cors from 'cors'
import { Application, json } from 'express'

export const middleware = (app: Application) => {
	app.use(cors())
	app.use(json())
}
