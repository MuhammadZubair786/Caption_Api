
// models/item.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    categoryImage: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: 0
    },
    sub_category: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubCategory", 
            required: false,
            default: null,
        },
    ],
    Caption:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Captions",
            required: false,
            default: null,
        },
    ],
    status: {
        type: String,
        required: true
    },
    category_type: {
        type: String,
        required: true
    }
},{ strictPopulate: false });

module.exports = mongoose.model('Category', categorySchema);
