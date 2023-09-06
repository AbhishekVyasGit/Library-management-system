const express = require("express");
const {createBookHandler, getBooksHandler, getOneBookHandler, updateBookHandler, deleteBookHandler} = require("../controllers/book-controller");
const router = express.Router();
const authentication = require ("../middlewares/authentication");
const authorization = require ("../middlewares/authorization");


router.post("/books", authentication, createBookHandler);
router.get("/books", authentication, getBooksHandler);
router.get("/books/:bookId", authentication, getOneBookHandler);
router.patch("/books/:bookId", authentication,authorization, updateBookHandler);
router.delete("/books/:bookId", authentication,authorization, deleteBookHandler);



module.exports = router;