const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const productRoute = require("./src/router/product");
const categoryRoute = require("./src/router/category");
const authRoute = require("./src/router/auth");
const searchRoute = require("./src/router/search");

dotenv.config();
//CONNECT DB
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
  });

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("common"));

app.use("/v1/product", productRoute);
app.use("/v1/category", categoryRoute);
app.use("/v1/auth", authRoute);
app.use("/v1/search", searchRoute);

app.listen(8000, () => {
  console.log("server is running...");
});
