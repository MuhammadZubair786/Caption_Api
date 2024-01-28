const express = require('express');
const router = express.Router();
const authController = require('../Controller/authController');
const cloudinary = require('cloudinary').v2;


const multer = require('multer');



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



router.post('/regsister', authController.createUser);
router.post('/verify-otp', authController.verifyOtp);
router.post('/complete-profile', upload.single('profileImage'), authController.completeProfile);
router.post('/forgot-password', authController.forgotPassword);
router.post('/change-password', authController.PasswordOtpVerify);
router.post("/login",authController.login)




module.exports = router;