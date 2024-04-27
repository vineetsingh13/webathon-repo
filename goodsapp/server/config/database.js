const mongoose=require("mongoose")

mongoose.set("strictQuery",true)

const dbConnect=()=>{
    mongoose.connect(process.env.DB_URL).then(()=>{
        console.log("DB connected Successfully");
    }).catch((err)=>{
        console.error(err);
        process.exit(1);
    });
}

module.exports=dbConnect;