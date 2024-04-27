const mailSender = require("../utils/mailSender");

exports.contactUs=async(req,res)=>{
    try{

        const{fname,lname,email,phone,message}=req.body;
        const{userId}=req.user.id;

        if(!fname || !lname || !email || !phone || !message){
            return res.status(400).json({
                success:false,
                message:"Fill all the fields"
            });
        }

        const ownerMail=await mailSender(process.env.MY_MAIL,`Mail From Study-Gen User`,`Hello my name is ${fname 
                                        } ${lname} my mail id is ${email}\n And my message was ${message}`);


        const mailToUser=await mailSender(email,'Thanks-For messaging',`We're glad that you contacted us you can always share
                                                your messages and suggestion. Thanks for trusting Study-Gen`);

       return res.status(200).json({
            success:true,
            message:"Mail Send SuccessFully"
        });


    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Something went wrong while contacting"
        });
    }
}