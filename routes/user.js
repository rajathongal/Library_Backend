const express = require("express");
const router = express.Router();

const { addBook } = require("../controllers/addBook");

router.post("/addbook", addBook);

module.exports = router;