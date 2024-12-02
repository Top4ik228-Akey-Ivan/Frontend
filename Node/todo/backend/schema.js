import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    done: {
        type: Boolean,
        default: false,
    }
})

const todoModel = mongoose.model('todo', todoSchema)
export default todoModel