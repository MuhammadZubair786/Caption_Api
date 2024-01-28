
// models/item.js
const { required } = require('joi');
const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
   
    description: {
        type: String,
        default: 0
    },
    status: {
        type: String,
        required: true
    },
    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
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
    

},{ strictPopulate: false });

module.exports = mongoose.model('SubCategory', subCategorySchema);
