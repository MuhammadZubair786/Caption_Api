
// models/item.js
const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    image:{
        type: String,
        required: true

    },
    status: {
        type: String,
        required: true
    },
   
},{ strictPopulate: false });

module.exports = mongoose.model('Images', ImageSchema);
