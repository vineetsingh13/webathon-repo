const User=require("../model/User");
const OTP=require("../model/OTP");
const otpgenerator=require("otp-generator");

const bycrypt=require("bcrypt");
const AdditionalDetails=require("../model/AdditionalDetails");
const jwt=require("jsonwebtoken");
const mailSender = require("../utils/mailSender");

require("dotenv").config();

// sendOtp

exports.sendOtp=async(req,res)=>{

    try{const {email}=req.body;
    const resp=await OTP.findOne({email:email});
    
    if(resp){
       return res.status(400).json({
            success:false,
            message:"User already Exists",
        });
    }

    const otp=otpgenerator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:0,
        specialDigits: false,
        specialChars: false,  
    });
  
    const valid=await OTP.findOne({otp:otp});
    while(valid){
       otp=otpgenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:0,
            specialCasechars:false
        });
        valid=await OTP.findOne({otp:otp});
        
    }

    const otpcreate=await OTP.create({email,otp});
    console.log("otpcreated ",otpcreate)
    return res.status(200).json({
        success:true,
        message:"Valid otp sent",
        otp
    })
        }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message:"Valid otp could not be sent"})
        }

}

// signup

exports.signUp=async(req,res)=>{   

    try{

        const {fname,lname,email,password,confirmpassword,accountType,otp}=req.body;
        console.log(otp)
        if(!fname || !lname || !email || !password || !confirmpassword || !otp){
            return res.status(403).json({
                success:false,
                message:"Please fill all the field",

            });
        }

        const checkmail=await User.findOne({email});

        if(checkmail){
            return res.status(400).json({
                success:false,
                message:"False Signup",

            });
        }
        if(password!==confirmpassword){
            return res.status(400).json({
                success:false,
                message:"Wrong Password",

            });

        }

        const recentotp=await OTP.findOne({email}).sort({createdAt:-1}).limit(1);

        if(recentotp.otp===""){
            return res.status(400).json({
                success:false,
                message:"OTP not found",

            });
        }

        if(recentotp.otp!==otp){
            console.log(recentotp.otp)
            return res.status(403).json({
                success:false,
                message:"OTP didn't matched",

            });
        }

        const profile=await AdditionalDetails.create({
            gender:null,
            dob:null,
            aadharNo:null,
            contact:null,

        })
        const hashpassword=await bycrypt.hash(password,10);

        const dataresp=await User.create({fname,lname,email,password:hashpassword,accountType
        ,additionalDetails:profile._id,
        image:`https://api.dicebear.com/5.x/initials/svg?seed=${fname}${lname}`
                });

        return res.status(200).json({
            success:true,
            message:"Successfully signed up",
            dataresp
        })

    }catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message:"User could not be  signed up",
        })

    }
}

// login

exports.login=async(req,res)=>{
    try{

        const {email,password}=req.body;

        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"Please fill all the fields"
            })
        }
         const user=await User.findOne({email}).populate("additionalDetails");
         if(!user){
            return res.status(401).json({
                success:false,
                message:"User not found"
            });
         }

         const validate=await bycrypt.compare(password,user.password);

         if(!validate){
            console.log("*****nikal******")
            return res.status(403).json({
                success:false,
                message:"Wrong Password"
            });
         }

         const payload={
            email:user.email,
            id:user._id,
            accountType:user.accountType
         }
         const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"2h"});

         user.token=token;
         user.password=undefined;

         const options={
            expiresIn:new Date(Date.now()*3*60*60*24*1000),
            httpOnly:true,
         }

         res.cookie("token",token,options).status(200).json({
            success:true,
            token,
            user,
            message:'Successfull Log In'
         })

 

    }catch(err){
        return res.status(400).json({
            success:false,
            message:"User could not be logged in"
        })
    }
}

// change password
exports.changepassword=async(req,res)=>{
    try{
        const{oldpass,newpass,confirmpass}=req.body;
        
        if(!oldpass || !newpass || !confirmpass){
            return res.status(403).json({
                success:false,
                message:'Please fill all the fields'
            });
 
        }
        // console.log("hi");
        // const value=req.cookies.user;
        const {email,password}=req.cookies.user;
        // const {email,password}=value;

        // console.log(value)
       
        console.log(oldpass," ",password);
        if(oldpass!==password){

            return res.status(401).json({
                success:false,
                message:'Password Incorrect'
            });
        } 

        if(oldpass!==newpass || newpass!==confirmpass){
            return res.status(403).json({
                success:false,
                message:'Password did not matched'
            });

        }

        const updateuser=await User.findByIdAndUpdate({email:email},{password:newpass});

        if(!updateuser){
            return res.status(401).json({
                success:false,
                message:'Failed to update'
            });
        }

        await mailSender(email,"Password Changed",`<b>Your new Password is ${newpass}</b>`);

        return res.status(200).json({
            success:true,
            message:'Password changed successfully'
        });

    }catch(err){

    }
}