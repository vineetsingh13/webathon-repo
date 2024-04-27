const express = require("express");
const userRouter = express.Router();


const { auth } = require("../Middleware/auth"); 

const { sendOtp, login, signUp, changepassword } = require("../Controller/Auth");
const {contactUs}=require("../Controller/ContactUs");
// Define routes
userRouter.post("/sendotp", sendOtp);
userRouter.post("/login", login);
userRouter.post("/signup", signUp);


userRouter.post("/changepassword", auth, changepassword);


userRouter.post("/contactus", auth, contactUs);

module.exports = userRouter;

