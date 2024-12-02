import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
    chatId: {type: mongoose.Schema.Types.ObjectId,  ref: 'Chat', required: true},
    senderId: {type: String, required: true},
    content: {type: String, required: true},
    timestamp: [{ type: Date, default: Date.now }]
})

module.exports = mongoose.model('Message', messageSchema)