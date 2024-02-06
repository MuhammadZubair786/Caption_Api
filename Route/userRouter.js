const express = require('express');
const router = express.Router();
const {getAllUser,sendRequest, getUser, viewCategory, viewSubCategory, getCaptions, getImages, getUserPosts} = require('../Controller/userController');
const {authMiddleware} = require("./authMiddleWare");
const { createUserpost, getMyPost } = require('../Controller/postController');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// router.post("/create-ticket", userController.createTicket)
// router.get("/get-all-ticket", userController.getAllTickets)
router.get("/get_all_user",authMiddleware,getAllUser)
router.post("/send_Request",authMiddleware,sendRequest)
router.get("/get-current-user",authMiddleware,getUser)
router.get("/view-category",authMiddleware,viewCategory)
router.get("/view-sub-category/:categoryId",authMiddleware,viewSubCategory)
router.get("/view-caption",authMiddleware,getCaptions)
router.get("/view-Images",authMiddleware,getImages)
router.post("/create-post",authMiddleware,upload.single('image'),createUserpost)
router.get("/get-my-post",authMiddleware,getMyPost)
router.get("/get-all-users",authMiddleware,getAllUser)
router.get("/get-user-post/:userId",authMiddleware,getUserPosts)







// router.get("/")





module.exports = router;