const express=require("express");
const cookie=require('cookie-parser')
const app=express();

const productRouter=require("./Routes/Product");
// const paymentRouter=require("./Routes/Payment");
const additionalDetailsRouter=require("./Routes/AdditionalDetails");
const userRouter=require("./Routes/User");
const cors=require("cors");
const fileUpload=require("express-fileupload")

const {cloudinaryConnect}=require("./Config/cloudinaryConnect");
const dbConnect = require("./Config/database");

app.use(express.json());
app.use(cookie());
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}));
app.use(fileUpload({useTempFiles:true,tempFileDir:"/tmp"}));

const PORT=process.env.PORT || 5000;

dbConnect();
cloudinaryConnect();

app.use("/api/v1/course",productRouter);
// app.use("/api/v1/payment",paymentRouter);
app.use("/api/v1/profile",additionalDetailsRouter);
app.use("/api/v1/user",userRouter);



app.listen(PORT,()=>{
    console.log(`Server started Successfully at ${PORT}`);
});






