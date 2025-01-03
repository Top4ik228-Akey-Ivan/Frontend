import mongoose from 'mongoose'

const chatSchema = new mongoose.Schema({
    chatName: {type: String, required: true},
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    lastMessage: {type: mongoose.Schema.Types.ObjectId, ref: 'Message'},
    chatUrl: {type: String}
})

export default mongoose.model('Chat', chatSchema)


