const express = require("express");
const router = express.Router();

const { createUser, signInUser } =require("../controllers/auth");
const { rawListeners } = require("../models/users");
const { addBook } = require("../controllers/addBook");

router.post("/signup", createUser);
router.post("/login", signInUser);
router.post("/addbook", addBook);

module.exports = router;