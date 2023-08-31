const express = require("express");
const router  = express.Router();
const { createBookReviewHandler, updateBookReviewHandler, deleteBookReviewHandler, getAllBookReviewHandler} = require("../controllers/review-controller");
const auth = require ("../middlewares/auth");


router.get("/books/:bookId/review/", auth, getAllBookReviewHandler);
router.post("/books/:bookId/review/", auth, createBookReviewHandler);
router.patch("/books/:bookId/review/:reviewId", auth, updateBookReviewHandler);
router.delete("/books/:bookId/review/:reviewId", auth, deleteBookReviewHandler);


module.exports = router;
