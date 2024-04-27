const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    rating: {
        type: Number,
        required: true
    },
    review: {
        type: String
    }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = {
   
    Review
};