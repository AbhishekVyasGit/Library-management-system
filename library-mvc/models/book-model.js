const { Schema, model } = require("mongoose");


const bookSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        excerpt: {
            type: String,
            required: true,
            trim: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'user',
        },
        ISBN: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        category: {
            type: String,
            required: true,
            trim: true
        },
        subcategory: [{
            type: String,
            required: true,
            trim: true
        }],
        reviews: {
            type: Number,
            default: 0,
        },
        deletedAt: {
            type: Date,
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        releasedAt: {
            type: Date,
            required: true
        },
        bookCover: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const Book = model("book", bookSchema);

module.exports = Book;



