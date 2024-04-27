const Categories = require("../model/Categories");



exports.createcategory=async (req,res)=>{
    try{

        const{name,description}=req.body;

        if(!name || !description){
            return res.status(403).json({
                success:false,
                message:'Fill the Fields'
            });
        }

        const valid=await Categories.findOne({name});

        if(valid){
            return res.status(403).json({
                success:false,
                message:'category already exists'
            });
        }

    await Categories.create({name:name,description:description});

        return res.status(200).json({
            success:true,
            message:'Successful category creation'
        });

    }catch(err){
        return res.status(500).json({
            success:false,
            message:'Something went wrong while creating category'
        });
    }
}

exports.showAllcategories=async (req,res)=>{
    try{
        
        const data=await Categories.find({},{name:true,description:true});
        console.log(data)
        return res.status(200).json({
            success:true,
            message:'Successful data of category'
            ,data:data
        });
    }catch(err){
        return res.status(500).json({
            success:false,
            message:'Something went wrong while fetching categories'
            
        });
    }
}

exports.categoryPageDetails=async(req,res)=>{
    
    try{
        const{categoryId}=req.body;
        const selectedCategory=await Categories.findOne({categoryId}).populate("course").exec();


        if(!selectedCategory){
            return res.status(404).json({
                success:false,
                message:"Category not found"
            });
        }
        const differentCategories=await Categories.find({_id:{$ne:selectedCategory._id}}).populate("course").exec();
        console.log("inside category")

        const topCategories =await Categories.find({}).sort();

        res.status(200).json({
            success:true,
            data:{
                selectedCategory,
                differentCategories,
                topCategories
            }
        })
    }catch(err){

    }
}