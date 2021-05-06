const express = require("express");
const { extend } = require("lodash");

const router = express.Router();
const cors = require("cors");
const CartItem = require("../models/cart.model");

router.use(cors());

router
  .route("/")
  .get(async (req, res) => {
    try {
      const cartItems = await CartItem.find({});
      res.json({ success: true, cartItems });
    } catch (error) {
      res.json({
        success: false,
        message: "Couldn't fetch cartItem",
        errorMessage: error.message,
      });
    }
  })
  .post(async (req, res) => {
    try {
      const newItem = req.body;
      console.log({ newItem });
      const newCartItem = new CartItem(newItem);
      const responseDb = await newCartItem.save();
      res.json({ success: true, responseDb });
    } catch (error) {
      res.json({
        success: false,
        message: "Couldn't add product to cart",
        errorMessage: error.message,
      });
    }
  });

router.param("cartitemId", async (req, res, next, cartitemId) => {
  try {
    const cartitem = await CartItem.findById(cartitemId);

    if (!cartitem) {
      res.json({ success: false, message: "Not able to find the product" });
    }
    req.product = cartitem;
    next();
  } catch (error) {
    res.json({
      success: false,
      message: "Not able to find product",
      errorMessage: error.message,
    });
  }
});

router
  .route("/:cartitemId")
  .get(async (req, res) => {
    const cartItem = req.product;
    res.json({ success: true, item: cartItem });
  })

  .post(async (req, res) => {
    const cartItem = req.product;
    const cartUpdate = req.body;
    console.log("cartItem", cartItem, "cartUpdate", cartUpdate);
    const mergedCartItem = extend(cartItem, cartUpdate);
    const updatedCartItem = mergedCartItem.save();
    res.json({ success: true, message: "item updated", updatedCartItem });
  })
  .delete(async (req, res) => {
    const cartitem = req.product;
    const serverResponse = await CartItem.remove(cartitem);
    res.json({
      success: true,
      message: "successfully deleted item from cart",
      serverResponse,
    });
  });

module.exports = router;
