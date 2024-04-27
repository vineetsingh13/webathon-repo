const Mongoose  = require("mongoose");

const Reviews = require("../model/Review");

exports.createRatings=async(req,res)=>{
    try{
        const{rating,review,courseId}=req.body;
        const userId=req.user.id;

        if(!rating || !review || !userId || !courseId){
            return res.status(400).json({
                success:false,
                message:'Fill all the fields for ratings'
            });
        }
  


        const createReview=await Reviews.create({user:userId,rating:rating,review:review,course:courseId })

        if(!createReview){
            return res.status(401).json({
                success:false,
                message:'Could not create review'
            });
        }

        console.log(updatedCourse);

        return res.status(200).json({
            success:true,
            message:'Created Rating Successfully',
            createReview
        })


    }catch(err){
       return res.status(500).json({
            success:false,
            message:'Something went wrong while creating review'
        })
    }
}


exports.getAllRatings=async(req,res)=>{
    try {
        const ratings=await RatingAndReviews.find({}).sort({rating:"desc"})
                                            .populate({path:"user",select:"fname lname email image"})
                                            .populate({path:"course",select:"crsName"}).exec();

       return res.status(200).json({
           success:true,
           message:"Successfull rating fetch",
          data: ratings
       });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        });
    }
}