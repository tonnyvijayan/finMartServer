require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const errorHandler = require("./MiddleWares/error-handler");
const routeNotFound = require("./MiddleWares/route-Not-Found");
const mongoose = require("mongoose");
const { initializeDbConnection } = require("./Db/db.connect.js");

const app = express();
app.use(bodyParser.json());

initializeDbConnection();

const products = require("./routes/product.router.js");
const cartItems = require("./routes/cart.router.js");
const wishListItems = require("./routes/wishlist.router.js");

app.use("/products", products);
app.use("/cartitems", cartItems);
app.use("/wishlists", wishListItems);

app.get("/", (req, res) => {
  res.send("hello world");
});

const port = 3003;

app.use(routeNotFound);
app.use(errorHandler);

app.listen(process.env.PORT || port, () => {
  console.log("server started on", port);
});
