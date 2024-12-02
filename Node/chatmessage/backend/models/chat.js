import mongoose from 'mongoose'

const chatSchema = new mongoose.Schema({
    name: {type: String, required: true},
    participants: [{ type: String, ref: 'User' }]
})

module.exports = mongoose.model('Chat', chatSchema)

