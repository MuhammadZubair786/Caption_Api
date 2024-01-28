const express = require('express');
const router = express.Router();
const userrouter = require('./userRouter.js');
const authrouter = require("./authRouter.js")
const adminrouter = require("./AdminRouter.js")
const { authMiddleware } = require('./authMiddleWare.js');

router.use("/auth",authrouter) //Auth 
// router.use('/user', authMiddleware);
router.use('/user', userrouter);
router.use("/admin",adminrouter)


module.exports = router;