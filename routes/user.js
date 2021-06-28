const express = require("express");
const router = express.Router();

const { addBook, bookView, addBookCoverPage } = require("../controllers/addBook");
const { booksList } = require("../controllers/booksList");

router.post("/addbook", addBook);
router.get("/booksList", booksList);
router.post("/getBook", bookView);
router.post("/addCoverPage", addBookCoverPage);

module.exports = router;