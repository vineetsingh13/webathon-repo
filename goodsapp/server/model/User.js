const mongoose=require('mongoose');

const userScheama=new mongoose.Schema({
    fname:{
        type:String,
        required:true,
        trim:true,
    },
    lname:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    accountType:{
        type:String,
        enum:["Buyer","Seller"],
        require:true,
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'AdditionalDetails',
    },
    product:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
    }],
    image:{
        type:String,
        required:true,
    },
    ewsImage:{
        type:String,
        // required:true,
    },
    token:{
        type:String
    },
    resetPasswordExpires:{
        type:Date
    },
});

module.exports=mongoose.model("User",userScheama);
