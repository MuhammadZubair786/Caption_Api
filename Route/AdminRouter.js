

const express = require('express');
const multer = require('multer');
const { validateCategory } = require('../Validator/categoryValidate');
const { authMiddleware } = require('./authMiddleWare');
const { createCategory, createSubCategory, viewCategory, createCaptionCategory, createImages } = require('../Controller/categoryController');
const subCategoryModel = require('../Model/subCategoryModel');
const { adminLogin } = require('../Controller/adminController');



const router = express.Router();

// "email": "admin@admin.com",
// "password": "Admin123"


// Multer configuration for file upload
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         const ext = file.originalname.split('.').pop();
//         cb(null, 'media-' + uniqueSuffix + '.' + ext);
//     },
// });

// const upload = multer({ storage: storage });

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/Login",adminLogin)



// Route to create a category
router.post(
    '/create-Category',
    authMiddleware,
    upload.single('categoryImage'),
    createCategory
);

router.post(
    '/subCreate-Category/:id',
    authMiddleware,
    createSubCategory
);


router.get(
    '/viewCategory',
    authMiddleware,
    viewCategory
);

router.post(
    '/subCreate-Category',
    authMiddleware,
    createSubCategory
);


router.post(
    '/Caption-Category/:id',
    authMiddleware,
    createCaptionCategory
);

router.post(
    '/Caption-Sub-Category',
    authMiddleware,
    createSubCategory
);

router.post(
    '/add-Images',
    authMiddleware,
    upload.single('image'),
    createImages
);


module.exports = router;
