const Book = require("../models/book-model");
const Review = require("../models/review-model");


const createBookReviewHandler = async (req, res) => {


    try {


        const getBook = await Book.findOne({ _id: req.body.bookId });


        if (!getBook) {

            return res.status(400).json("bookId not found");
        }

        const createBookReview = await Review.create(req.body);
        return res.status(201).json(createBookReview);

    } catch (error) {
        console.log(error);

        return res.status(400).json({ message: error.message });

    }
}


const updateBookReviewHandler = async (req, res) => {

    try {

        const updateBookReview = await Review.findByIdAndUpdate(req.params.reviewId, req.body, { new: true });
        return res.status(201).json(updateBookReview);

    } catch (error) {
        console.log(error);

        return res.status(400).json({ message: error.message });

    }
}

const deleteBookReviewHandler = async (req, res) => {

    try {

        const deleteBookReview = await Review.findByIdAndDelete(req.params.reviewId);
        return res.status(200).json(deleteBookReview);

    } catch (error) {
        console.log(error);

        return res.status(400).json({ message: error.message });

    }
}

const getAllBookReviewHandler = async (req, res) => {

    try {

        const getBook = await Review.findOne(req.param.bookId);

        if (!getBook) {
            return res.status(400).json({ message: "bookId doesn't match" });
        }

        const getAllBookReview = await Review.find();
        return res.status(200).json(getAllBookReview);

    } catch (error) {
        console.log(error);

        return res.status(400).json({ message: error.message });

    }
}


module.exports = { createBookReviewHandler, updateBookReviewHandler, deleteBookReviewHandler, getAllBookReviewHandler };