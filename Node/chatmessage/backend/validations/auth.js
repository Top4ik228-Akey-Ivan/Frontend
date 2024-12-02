import { body } from 'express-validator'

export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 3 символа').isLength({min: 3}),
    body('fullName', 'Имя должно быть минимум 3 символа').isLength({min: 3}),
    body('avatarUrl', 'Неверная ссылка на изображение').optional().isURL(),
]