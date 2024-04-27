
const express=require("express");
const productRouter=express.Router();

const {createRatings}=require("../Controller/Review");
const {getAllRatings}=require("../Controller/Review");

const {createProduct}=require("../Controller/Product");
const {getAllProducts}=require("../Controller/Product");
const {getProductDetails}=require("../Controller/Product");


const {createcategory}=require("../Controller/Categories");
const {showAllcategories}=require("../Controller/Categories");
const {categoryPageDetails}=require("../Controller/Categories");

const{auth,isAdmin,isBuyer,isSeller}=require("../Middleware/auth");


productRouter.post("/createproduct",auth,isSeller,createProduct);
productRouter.get("/getallproducts",auth,isSeller,getAllProducts);
productRouter.post("/getproductdetails",auth,isSeller,getProductDetails);

productRouter.post("/createcategory",auth,isAdmin,createcategory);
productRouter.get("/showallcategories",showAllcategories);
productRouter.post("/categorypagedetails",categoryPageDetails);

productRouter.post("/createratings",auth,isBuyer,createRatings);
productRouter.get("/getallratings",getAllRatings);


module.exports=productRouter;

