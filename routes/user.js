const express = require("express");
const router = express.Router();

const { addBook, bookView, addBookCoverPage } = require("../controllers/addBook");
const { booksList } = require("../controllers/booksList");
const { authorList } = require("../controllers/authorList");

router.post("/addbook", addBook);
router.get("/booksList", booksList);
router.post("/getBook", bookView);
router.post("/addCoverPage", addBookCoverPage);
router.get("/authorList", authorList);

module.exports = router;