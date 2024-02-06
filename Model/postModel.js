
// models/item.js
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
        title: {
            type: String,
            required: false
        },
        imageUrl: {
            type: String, // Assuming you will store a URL or file path for the image
            required: false
        },
        post_type :{
            type: String, // Assuming you will store a URL or file path for the image
            required: true
        },
        user_id:{
            type: mongoose.Schema.Types.ObjectId,
            required:true

        }
},{ strictPopulate: false });

module.exports = mongoose.model('Posts', PostSchema);
