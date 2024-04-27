const Product=require("../model/Product");
const User=require("../model/User");
const Categories=require("../model/Categories");
const { uploadToCloudinary } = require("../utils/Imageupload");

exports.createProduct=async(req,res)=>{

    try{
        const{prodName,prodSpecification,oldYear,price,category}=req.body;

        const thumbnail=req.files.thumbnailImage;
        if(!prodName || !prodSpecification || !oldYear || !price || !category || !thumbnail ){
            return res.status(400).json({
                success:false,
                message:'Fill all the fields'
                
            });
        }
    
        const userId=req.user.id;
        const seller=await User.findOne({userId});
        
        if(!seller){
            return res.status(401).json({
                success:false,
                message:'seller not found'
                
            });
        }
        
        const categorycheck=await Categories.findById(category);
        if(!categorycheck){
            return res.status(401).json({
                success:false,
                message:'Wrong category'
                
            });
        }
       
        
        const imageUpload=await uploadToCloudinary(thumbnail,process.env.FOLDER_NAME);
        const saveProduct=await Product.create({prodName,prodSpecification,seller:seller._id,
            whatYouWillLearn,categories:category,
            thumbnail:imageUpload.secure_url});
            
            await User.findByIdAndUpdate({_id:seller._id},{$push:{ product:saveProduct._id}},{new:true});
            console.log("Inside product")

        await Categories.findByIdAndUpdate({_id:category},{$push:{product:saveProduct._id}},{new:true});
        
        return res.status(200).json({
            success:true,
            message:'Product Created Successfully'
       
        });
    }catch(err){
        console.error(err);
        return res.status(500).json({
            success:true,
            message:'Something went wrong while creating course'
         
        });
    }

}

exports.getAllProducts=async(req,res)=>{
    try{
        const product=await Product.find({},{prodName:true,price:true,seller:true,thumbnail:true,prodSpecification:true,oldYear:true}
                                    ).populate("seller").exec();

         return res.status(200).json({
             success:true,
             message:'Successful product fetch'
             ,product
         });
    }catch(err){        console.error(err);

        return res.status(500).json({
            success:false,
            
        });
    }
}

// function for getting detailed information about a prod .=
exports.getProductDetails=async(req,res)=>{

    try{

        const{prodId}=req.body;
        if(!prodId){
            return res.status(400).json({
                success:false,
                message:'Product id not available'
            });
        }

        const prodAvail=await Product.findOne({_id:prodId}).populate({path:"seller",populate:{path:"additionalDetails"}})
                    .populate("category")
                    .exec();

        console.log("crs ** " ,prodAvail)
        if(!prodAvail){
            return res.status(404).json({
                success:false,
                message:'product not found'
            });
        }
        return res.status(200).json({
            success:true,
            message:'Products details fetched successfully',
            prodAvail:prodAvail
        });




    }catch(err){
        console.error(err);

        return res.status(500).json({
            success:false,
            message:'Something went wrong while getting product details'
        })
    }
}