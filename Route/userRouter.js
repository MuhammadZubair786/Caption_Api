const express = require('express');
const router = express.Router();
const {getAllUser,sendRequest, getUser, viewCategory, viewSubCategory, getCaptions, getImages} = require('../Controller/userController');
const {authMiddleware} = require("./authMiddleWare");


// router.post("/create-ticket", userController.createTicket)
// router.get("/get-all-ticket", userController.getAllTickets)
router.get("/get_all_user",authMiddleware,getAllUser)
router.post("/send_Request",authMiddleware,sendRequest)
router.get("/get-current-user",authMiddleware,getUser)
router.get("/view-category",authMiddleware,viewCategory)
router.get("/view-sub-category/:categoryId",authMiddleware,viewSubCategory)
router.get("/view-caption",authMiddleware,getCaptions)
router.get("/view-Images",authMiddleware,getImages)



// router.get("/")





module.exports = router;