// Resetpass token
const User=require("../model/User");
const mailSender = require("../utils/mailSender");
const bcrypt=require("bcrypt")
const crypto=require("crypto");

exports.resetToken=async(req,res)=>{
    try{
        const {email}=req.body;
        if(!email){
            return res.status(403).json({
                success:false,
                message:'Fill the Email'
            });
        }
        const user=await User.findOne({email});

        if(!user){
            return res.status(401).json({
                success:false,
                message:'User not found'
            });
        }
        const token=crypto.randomUUID();
        const updateddetails=await User.findOneAndUpdate({email:email},
                                                    {token:token,resetPasswordExpires:Date.now()+60*5*1000},{new:true});
            const url=`http://localhost:3000/update-password/${token}`

        await mailSender(email,"Reset Password Mail",`Update your password at:${url}`);

        return res.status(200).json({
            success:true,
            message:"Successfully sent mail"
        });
    }catch(err){
        console.log(err)
        return res.status(500).json({
            success:false,
            message:'Something went wrong'
        });
    }
}

// Reset Password

exports.resetPassword=async(req,res)=>{
    try{
        const {password,confirmpassword,token}=req.body;

        if(!password|| !confirmpassword){
            return res.status(403).json({
                success:false,
                message:'Fill the password'
            });
        }
        if(password!==confirmpassword){
            return res.status(401).json({
                success:false,
                message:"Password didn't matched"
            });
        }
        const validate=await User.findOne({token});

        if(!validate){
            return res.status(401).json({
                success:false,
                message:'Wrong token'
            });
        }

        if(validate.resetPasswordExpires<Date.now()){
            return res.status(403).json({
                success:false,
                message:'Token expired'
            });
          }
          
          const hashed=await bcrypt.hash(password,10);

          const updateuser=await User.findOneAndUpdate({token:token},{password:hashed});
          return res.status(200).json({
            success:true,
            message:'Reset was successfull'
        });
    }catch(err){
        return res.status(500).json({
            success:false,
            message:'Something went wrong while reset'
        });

    }
}