// auth
const User=require("../model/User");
const jwt=require("jsonwebtoken");
require("dotenv").config();

exports.auth=(req,res,next)=>{
    try{
        const token=req.cookies.token|| req.body || req.header("Authorization").replace("Bearer","");
       if(!token){
            return res.status(401).json({
                success:false,
                message:'Token Missing'
            });
        }
        try{

            const decode= jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode)
            req.user=decode;
           
        }catch(err){
            return res.status(401).json({
                success:false,
                message:'Token did not matched'
            });
        }
       
        next();
    }catch(err){ console.log(err)
        return res.status(500).json({
            success:false,
            message:'Something went wrong'
        });
}
}





exports.isBuyer=(req,res,next)=>{
    try{

    if(req.user.accountType!=='Buyer'){
        return res.status(403).json({
            success:false,
            message:'Protected route for buyer'
        });
    }
    next();

    }catch(err){
        console.log(err)
        return res.status(401).json({
            success:false,
            message:'Something went wrong'
        });
    }
}


exports.isAdmin=(req,res,next)=>{
    try{
        console.log(req.user.accountType)
    if(req.user.accountType!=='Admin'){
        return res.status(403).json({
            success:false,
            message:'Protected route for Admin'
        });
    }
    next();

    }catch(err){
        return res.status(401).json({
            success:false,
            message:'Something went wrong'
        });
    }
}

// isInstructor
exports.isSeller=(req,res,next)=>{
    try{

    if(req.user.accountType!=='Seller'){
        return res.status(403).json({
            success:false,
            message:'Protected route for Seller'
        });
    }
    next();

    }catch(err){
        return res.status(401).json({
            success:false,
            message:'Something went wrong'
        });
    }
}