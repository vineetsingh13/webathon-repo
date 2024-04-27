const AdditionalDetails=require("../model/AdditionalDetails");
const User=require("../model/User");
const {uploadToCloudinary}=require("../utils/Imageupload")

exports.updateProfile=async(req,res)=>{
    try {
        const {gender,dob="",about="",contact}=req.body;

        if(!gender || !contact){
            return res.status(400).json({
                success:false,
                message:"Please fill the mandatory fields"
            })
        }

        const userId=req.user.id;
        const user=await User.findById(userId);
        const profileId=user.additionalDetails;

        const updatedProfile=await AdditionalDetails.findByIdAndUpdate({_id:profileId},{gender:gender,dob:dob,about:about,contact:contact},{new:true});

        return res.status(200).json({
            success:true,
            message:"Successfully updated Profile",
            updatedProfile
        });

        
    } catch (error) {
        
    }
}
exports.updateProfilePic=async(req,res)=>{

    try {
   
        const picUpload=req.files.picUpload;
        console.log(picUpload);
        if(!picUpload ){
            return res.status(400).json({
                success:false,
                message:"Please fill the mandatory fields"
            })
        }

        const userId=req.user.id;
        const user=await User.findById(userId);
    

        const profilePic=await uploadToCloudinary(picUpload,process.env.FOLDER_NAME);

       
        const updatedProfile=await User.findByIdAndUpdate({_id:userId},{image:profilePic.secure_url},{new:true});
         console.log("h")
        return res.status(200).json({
            success:true,
            message:"Successfully updated Profile",
            updatedProfile
        });

        
    } catch (error) {
        
    }
}


exports.updateEWSPic=async(req,res)=>{

    try {
   
        const ewsUpload=req.files.ewsUpload;
        console.log(picUpload);
        if(!picUpload ){
            return res.status(400).json({
                success:false,
                message:"Please fill the mandatory fields"
            })
        }

        const userId=req.user.id;
        const user=await User.findById(userId);
    

        const  ewsUploadPic=await uploadToCloudinary( ewsUpload,process.env.FOLDER_NAME);

       
        const updatedProfile=await User.findByIdAndUpdate({_id:userId},{ewsImage:ewsUploadPic.secure_url},{new:true});
         console.log("h")
        return res.status(200).json({
            success:true,
            message:"Successfully updated Profile",
            updatedProfile
        });

        
    } catch (error) {
        
    }
}


exports.deleteProfile=async(req,res)=>{
    try {
        
        const userId=req.user.id;
        const user=await User.findById(userId);
        
        
        if(!user){
            return res.status(404).json({
                success:false,
                message:"USer id not found"
            });

        }
        await Profile.findByIdAndDelete(user.additionalDetails);
        await User.findByIdAndDelete(userId);

        
        
            return res.status(200).json({
                success:true,
                message:"Successfully Deleted the account"
            });
   





    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error occurred while deleting the profile"
        });
    }
}