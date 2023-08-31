const { Schema, model } = require("mongoose");


const bookSchema = new Schema(
    {
        title: { type: String, required: true, unique: true },
        excerpt: { type: String, required: true },
        userId: { type: Schema.Types.ObjectId, required: true, refs: "user" },
        ISBN: { type: String, required: true, unique: true },
        category: { type: String, required: true },
        subcategory: [{ type: String, required: true }],
        reviews: { type: Number, default: 0 },
        isDeleted: { type: Boolean, default: false },
        releasedAt: { type: Date, required: true },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const Book = model("book", bookSchema);

module.exports = Book;



