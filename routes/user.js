const express = require("express");
const router = express.Router();

const { addBook, bookView } = require("../controllers/addBook");
const { booksList } = require("../controllers/booksList");

router.post("/addbook", addBook);
router.get("/booksList", booksList);
router.post("/getBook", bookView);

module.exports = router;