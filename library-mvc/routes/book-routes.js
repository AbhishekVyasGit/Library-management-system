const express = require("express");
const {createBookHandler, getBooksHandler, getOneBookHandler, updateBookHandler, deleteBookHandler} = require("../controllers/book-controller");
const router = express.Router();
const auth = require ("../middlewares/auth");


router.post("/books", auth, createBookHandler);
router.get("/books", auth, getBooksHandler);
router.get("/books/:bookId", auth, getOneBookHandler);
router.patch("/books/:bookId", auth, updateBookHandler);
router.delete("/books/:bookId", auth, deleteBookHandler);



module.exports = router;