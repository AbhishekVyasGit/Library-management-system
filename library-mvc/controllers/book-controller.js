const Book = require("../models/book-model");
const User = require("../models/user-model");
const Review = require("../models/review-model");


const createBookHandler = async (req, res) => {

    try {


        const getUser = await User.findOne({ _id: req.body.userId });

        if (!getUser) {

            return res.status(400).json("UserId not found");
        }

        const createBook = await Book.create(req.body);
        return res.status(201).json(createBook);

    } catch (error) {
        console.log(error);

        return res.status(400).json({ message: error.message });

    }
}


const getBooksHandler = async (req, res) => {

    try {

        const sort = req.query.sort;


        const getBooks = await Book.find()
            .sort({ title: sort == "title" ? -1 : 1 })
            .sort({ category: sort == "category" ? -1 : 1 })
            .sort({ subcategory: sort == "subcategory" ? -1 : 1 })

        return res.status(200).json(getBooks);

    } catch (error) {
        console.log(error);

        return res.status(400).json({ message: error.message });

    }
}


const getOneBookHandler = async (req, res) => {

    try {

        const getBook = await Book.findById(req.params.bookId);
        return res.status(200).json(getBook);

    } catch (error) {
        console.log(error);

        return res.status(400).json({ message: error.message });

    }
}


const updateBookHandler = async (req, res) => {

    try {

        const updateBook = await Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true });
        return res.status(201).json(updateBook);

    } catch (error) {
        console.log(error);

        return res.status(400).json({ message: error.message });

    }
}

const deleteBookHandler = async (req, res) => {

    try {

        const deleteBook = await Book.findByIdAndRemove(req.params.bookId);

        return res.status(200).json(deleteBook);


    } catch (error) {
        console.log(error);

        return res.status(400).json({ message: error.message });

    }
}



module.exports = { createBookHandler, getBooksHandler, getOneBookHandler, updateBookHandler, deleteBookHandler };