const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const path = require("path");
const cookieParser = require("cookie-parser");
const configuration = require('./configuration/configurations');
const multer = require('multer');

//server init
const app = express();

var whitelist = configuration.ALLOWEDORIGIN.split(',');
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { credentials: true, origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}
app.use(cors(corsOptionsDelegate));

//Init middleware
app.use(express.json({ extended: false }));
app.use(cookieParser());

//Init multer
const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,  //10MB
  },
});

//route Init
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "index.html"))
);

app.use("/auth", require("./routes/auth"));

app.use("/user", multerMid.single("file"), require("./routes/user"));

module.exports = app;