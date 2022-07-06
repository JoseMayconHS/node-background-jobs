import express from 'express'

import { controllers } from '@controller/controllers'

export const app = express()

controllers(app)
