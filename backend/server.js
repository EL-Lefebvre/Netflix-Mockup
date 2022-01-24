"use strict";
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const PORT = process.env.PORT || 8000;

const { getAllGenres } = require("./handlers");

const app = express();

//----------------[Middleware]-----------------

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(bodyParser.json());
app.use("/", express.static(__dirname + "/"));
app.use(morgan("tiny"));
app.use(express.static("public"));

//----------------------------------------------------

//ROUTES
app.get("/", (req, res) => {
  res.send("Port 8000 working");
  getAllGenres;
});
