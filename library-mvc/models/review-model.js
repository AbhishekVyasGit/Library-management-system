const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
    {
        bookId: { type: Schema.Types.ObjectId, required: true, refs: "book" },
        reviewedBy: { type: String, required: true, default: 'Guest' },
        reviewedAt: { type: Date, required: true },
        rating: { type: Number, min: 1, max: 5, required: true },
        review: { type: String },
        isDeleted: { type: Boolean, default: false },

    },
    {
        timestamps: true,
        versionKey: false
    }

)




const Review = model("review", reviewSchema);

module.exports = Review;