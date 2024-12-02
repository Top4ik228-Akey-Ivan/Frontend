import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import { registerValidation } from './validations/auth.js'
import checkAuth from './utils/checkAuth.js'
import * as userController from './controllers/userController.js'

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/chat')
    .then(() => console.log('DB Connected'))
    .catch((err) => console.log(err))


app.get('/auth/me', checkAuth, userController.getMe)
app.post('/auth/login', userController.login)
app.post('/auth/register', registerValidation, userController.register)

app.listen(5000, () => {
    console.log('Server OK')
})


