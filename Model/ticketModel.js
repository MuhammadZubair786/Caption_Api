const mongoose = require('mongoose');

const ticketModel = new mongoose.Schema({
    user_id: {
        ref: "user",
        type: mongoose.Schema.Types.ObjectId,
    },
    admin_id: {
        ref: "user",
        type: mongoose.Schema.Types.ObjectId,
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['requested', 'completed', 'pending'],
        default: 'requested'
    }

})
module.exports = mongoose.model('ticket', ticketModel);