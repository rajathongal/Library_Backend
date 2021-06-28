const express = require("express");
const router = express.Router();

const { addBook } = require("../controllers/addBook");
const { booksList } = require("../controllers/booksList");

router.post("/addbook", addBook);
router.get("/booksList", booksList);

module.exports = router;