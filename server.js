const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const path = require("path");
const cookieParser = require("cookie-parser");
const configuration = require('./configuration/configurations');

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

//route Init
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "index.html"))
);

app.use("/auth", require("./routes/auth"));

module.exports = app;