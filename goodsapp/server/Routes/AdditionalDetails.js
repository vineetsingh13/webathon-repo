

const express=require("express");
const additionalDetailsRouter=express.Router();

const{auth}=require("../Middleware/auth");


const {updateProfile}=require("../Controller/Profile");
const {deleteProfile}=require("../Controller/Profile");
const {updateProfilePic}=require("../Controller/Profile");
const {updateEWSPic}=require("../Controller/Profile");


const {resetToken}=require("../Controller/ResetPassword");
const {resetPassword}=require("../Controller/ResetPassword");

additionalDetailsRouter.post("/updateprofile",auth,updateProfile);
additionalDetailsRouter.post("/updateprofilepic",auth,updateProfilePic);
additionalDetailsRouter.post("/updateewspic",auth,updateEWSPic);
additionalDetailsRouter.delete("/deleteprofile",auth,deleteProfile);

additionalDetailsRouter.post("/resettoken",resetToken);
additionalDetailsRouter.post("/resetpassword",auth,resetPassword);

module.exports=additionalDetailsRouter;
