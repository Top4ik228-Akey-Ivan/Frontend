import mongoose from 'mongoose'
import express from 'express'
import todoModel from './schema.js'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://localhost:27017/tododb')
    .then(() => console.log('DB Connected'))
    .catch((err) => console.log(err))

app.get('/todos', async(req, res) => {
    try {
        const todos = await todoModel.find()
        res.json(todos)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось получить todos'
        })
    }
 })

app.post('/todos', async(req, res) => {
    try{
        const todo = new todoModel({
            text: req.body.text
        })
        await todo.save()
        res.json(todo)
    } catch (err) {
        res.status(400).json({
            message: 'Не получилось создать todo'
        })
    }
})

app.delete('/todos/:id', async(req, res) => {
    try{
        const {id} = req.params
        const deletedTodo = await todoModel.findByIdAndDelete(id)
        if (!deletedTodo) {
            return res.status(404).json({
                message: 'Ну удалось найти todo'
            })
        }
        res.json({
            message: 'Успешно удалено'
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Ну удалось удалить todo"
        })
    }
})

app.patch('/todos/:id', async(req, res) => {
    try{
        const { id } = req.params
        const { done } = req.body
        
        const updatedTodo = await todoModel.findByIdAndUpdate(
            id, 
            {done},  
            {new: true}
        )
        if (!updatedTodo) {
            return res.json({
                message: 'Ну удалось найти todo'
            })
        }
        res.json({
            message: 'Успешно обновлено'
        })
    } catch (err) {
        console.log(err)
        res.json({
            message: 'Не удалось обновить todo'
        })
    }
})


app.listen(5000, (err) => {
    if (err)  return console.log(err)
    console.log('Server OK')
})