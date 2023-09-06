const Book = require("../models/book-model");
const User = require("../models/user-model");
const mongoose = require("mongoose");
let ObjectId = mongoose.Types.ObjectId;
const jwt = require("jsonwebtoken");
const secretKey = "library";


const authorization = async (req, res, next) => {

    try {
        let token = req.headers.authorization;

        if (token) {
            token = token.split(" ")[1];
        };

        let verifyToken = jwt.verify(token, secretKey);

        const bookId = req.params.bookId;

        if (!ObjectId.isValid(bookId)) {
            return res.status(400).json({ Message: "please enter valid bookId" })
        };

        const getBook = await Book.findById(bookId);
        const userId = getBook.userId.toString();

        if (verifyToken.userId !== req.body.userId) {
            return res.status(400).json({ Message: "please enter valid bookId" })
        };
        req.body.userId = verifyToken.userId

        const getUser = await User.findById(userId);
        const userEmail = getUser.email.toString();
        if (!getUser) {
            return res.status(404).send({ status: false, message: "user not found" })
        };

        if (verifyToken.email !== userEmail) {
            return res.status(401).json({ message: "Unauthorized User" });
        }

        next();


    } catch (error) {

        return res.status(500).json({ message: err.message });

    }

}

module.exports = authorization;