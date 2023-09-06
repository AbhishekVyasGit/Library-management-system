const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
    {
         bookId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "book",
        trim: true
    },
    reviewedBy: {
        type: String,
        required: true,
        default: 'Guest',
        trim: true
    },
    reviewedAt: {
        type: Date,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
        trim: true
    },
    review: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
    },
    {
        timestamps: true,
        versionKey: false
    }

)




const Review = model("review", reviewSchema);

module.exports = Review;