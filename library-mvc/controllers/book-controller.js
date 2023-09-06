const Book = require("../models/book-model");
const User = require("../models/user-model");


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

        const page = req.query.page || 1;
        const pageSize = req.query.pageSize || 5;
        const sort = req.query.sort;
        
        const skip = (page - 1) * pageSize;

        const getBooks = await Book.find()
            .sort({ title: sort == "title" ? -1 : 1 })
            .skip(skip)
            .limit(pageSize)
            .lean().exec();  // its not required but its good habit

        const totalPages = Math.ceil((await Book.find().countDocuments()) / pageSize);


        return res.status(200).json({ getBooks, totalPages });

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



        const updateBook = await Book.findOneAndUpdate({ _id: req.params.bookId, isDeleted: false }, { isDeleted: true, deletedAt: Date.now() }, { new: true });

        if (!updateBook) {

            return res.status(404).json({ message: "Book not found or already deleted" });

        }

        return res.status(200).json(updateBook);


    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: error.message });

    }
}



module.exports = { createBookHandler, getBooksHandler, getOneBookHandler, updateBookHandler, deleteBookHandler };