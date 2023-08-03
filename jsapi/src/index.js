"use strict";
require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
// const dotenv = require("dotenv");

const app = express();
app.use(logger("combined"));
app.use(cors());
app.use(helmet());
app.use(express.json());


app.use("/api/v1/", require("./routes/todo.routes"));
app.use("/api/v1/", require("./routes/user.routes"));

app.use(function (err, req, res, next) {
  const message = err.message;
  const code = err.statusCode;
  const status = err.status;
  
  res.status(code).json({
    massage: message,
    status: status,
  
  });
});

const port = 3000 | process.env.PORT;
app.listen(port, () => {
  console.log(`the app is listening on port ${port}`);
});
