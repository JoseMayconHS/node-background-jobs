import { Application, json } from "express";
import cors from 'cors'

export const middleware = (app: Application) => {
  app.use(cors())
  app.use(json())
}
