
// models/item.js
const { required } = require('joi');
const mongoose = require('mongoose');

const captionCategorySchema = new mongoose.Schema({
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
    subCategoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",
        // required: true,
    }
    

},{ strictPopulate: false });

module.exports = mongoose.model('Captions', captionCategorySchema);
