const mongoose=require('mongoose');

const categoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    product:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    }],
});

const Categories = mongoose.model('Categories', categoriesSchema);
