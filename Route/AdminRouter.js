

const express = require('express');
const multer = require('multer');
const { validateCategory } = require('../Validator/categoryValidate');
const { authMiddleware } = require('./authMiddleWare');
const { createCategory, createSubCategory, viewCategory, createCaptionCategory, createImages, deleteCategory, updateCategory, viewSubCategory, deletesubCategory, updatesubCategory, getCaptions, deleteCaptions, editCaption, viewImages, deleteImages } = require('../Controller/categoryController');
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


router.get(
    '/viewCategory',
    authMiddleware,
    viewCategory
);

router.delete(
    '/delete-Category/:categoryId',
    authMiddleware,
    deleteCategory
);


router.post(
    '/update-Category/:categoryId',
    authMiddleware,
    upload.single('image'),
    updateCategory
);


router.post(
    '/subCreate-Category/:id',
    authMiddleware,
    createSubCategory
);

router.post(
    '/update-sub-category/:subCategoryId',
    authMiddleware,
    updatesubCategory
);




router.delete(
    '/subCreate-Category/:subCategoryId',
    authMiddleware,
    deletesubCategory
);


router.delete(
    '/delete-subCreate/:subCategoryId',
    authMiddleware,
    createSubCategory
);


router.get(
    '/view-subCreate/:categoryId',
    authMiddleware,
    viewSubCategory
);

router.post(
    '/Caption-Category/:id',
    authMiddleware,
    upload.single('image'),
    createCaptionCategory
);

router.post(
    '/Caption-Sub-Category',
    authMiddleware,
    createSubCategory
);


router.get(
    '/get-caption',
    authMiddleware,
    getCaptions
);

router.delete(
    '/delete-caption/:captionId',
    authMiddleware,
    deleteCaptions
);


router.post(
    '/edit-caption/:captionId',
    authMiddleware,
    upload.single('image'),
    editCaption
);



router.post(
    '/add-Images',
    authMiddleware,
    upload.single('image'),
    createImages
);

router.get(
    '/view-Images',
    authMiddleware,
    viewImages
);

router.delete(
    '/delete-Image/:imageId',
    authMiddleware,
    deleteImages
);


module.exports = router;
