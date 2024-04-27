
const mongoose=require("mongoose");
const mailSender = require("../utils/mailSender");

const OTPschema=new mongoose.Schema({

   email:{
    type:String,
    required:true,
   },
   otp:{
    type:String,
    required:true,
   },
   createdAt:{
    type:Date,
    default:Date.now(),
    expires:5*60,
   }
   

});

async function emailVerification(email,otp){

   try{
      const mailResponse=await mailSender(email,"This is Verification OTP",otp);
   }catch(err){
      console.log("Error occured while sending email",err);
      throw err;

   }

}

OTPschema.pre("save",async function(next){
   await emailVerification(this.email,this.otp);
})




module.exports=mongoose.model("OTP",OTPschema);