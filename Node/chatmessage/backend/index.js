import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import multer from 'multer'
import { Server } from 'socket.io'; // Импортируем Server из socket.io
import http from 'http'

import { registerValidation } from './validations/auth.js'
import checkAuth from './utils/checkAuth.js'
import * as userController from './controllers/userController.js'

import chatModel from './models/chat.js'
import messageModel from './models/message.js'

const app = express()
const server = http.createServer(app); // Создаем HTTP сервер
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000', // Разрешите запросы только с этого источника
        methods: ['GET', 'POST', 'PATCH'],
        credentials: true,
    },
});


const corsOptions = {
    origin: 'http://localhost:3000', // Разрешить запросы только с этого источника
    methods: ['GET', 'POST', 'PATCH'], // Разрешенные методы
    credentials: true, // Разрешить отправку куки
};
app.use(cors(corsOptions));

app.use('/uploads', express.static('uploads'))
app.use(cors())
app.use(express.json())



const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    },
})

const upload = multer({storage})

mongoose.connect('mongodb://localhost:27017/chat')
    .then(() => console.log('DB Connected'))
    .catch((err) => console.log(err))



app.get('/auth/me', checkAuth, userController.getMe)
app.post('/auth/login', userController.login)
app.post('/auth/register', registerValidation, userController.register)
app.patch('/profile/:id', checkAuth, userController.updateUser)
app.get('/users', checkAuth, userController.getAllUsers)


app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `http://localhost:5000/uploads/${req.file.originalname}`
    })
})

app.get('/chats/:userId', async(req, res) => {
    const userId = req.params.userId
    try {
        const chats = await chatModel.find({participants: userId}).populate('participants').populate('lastMessage')
        res.json(chats)
    } catch (err) {
        console.log(err)
        res.status(400).json({
            message: 'Не получилось получить чаты пользователя'
        })
    }
})
app.post('/chat', checkAuth, async(req, res) => {
    try {
        const { chatName, participants, chatUrl } = req.body
        const newChat = new chatModel({chatName, participants, chatUrl})
        await newChat.save()
        res.json(newChat)
    } catch (err) {
        console.log(err)
        res.status(400).json({
            message: 'Не удалось создать чат'
        })
    }
})

app.patch('/chat/:id', checkAuth, async(req, res) => {
    const { id } = req.params
    const updatedData = req.body
    try {
        const doc = await chatModel.findByIdAndUpdate(id, updatedData, {new: true}).populate('lastMessage')
        if (!doc) {
            res.status(404).json({
                message: 'Ну удалось найти чат'
            })
        }
        res.json(doc)
    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: 'Не удалось обновить информацию'
        })
    }
})


// Новый маршрут для отправки сообщений
app.post('/messages', checkAuth, async (req, res) => {
    try {
        const { chatId, senderId, content } = req.body;
        const newMessage = new messageModel({ chatId, senderId, content });
        await newMessage.save();
        res.json(newMessage);
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: 'Не удалось отправить сообщение'
        });
    }
});

// Новый маршрут для получения сообщений по chatId
app.get('/messages/:chatId', async (req, res) => {
    const chatId = req.params.chatId;
    try {
        const messages = await messageModel.find({ chatId }).populate('senderId'); // Заполнение senderId для получения информации о пользователе
        res.json(messages);
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: 'Не удалось получить сообщения'
        });
    }
});




io.on('connection', (socket) => {
    console.log('New user connected');

    // Обработка получения сообщения
    socket.on('sendMessage', (message) => {
        // Отправка сообщения всем подключенным клиентам
        console.log('дошло')
        io.emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});


server.listen(5000, () => {
    console.log('Server OK')
})
///////////////////////////////////////////////////////


