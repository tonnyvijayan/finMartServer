const express = require("express");
const router = express.Router();
const { extend } = require("lodash");
const cors = require("cors");

const Product = require("../models/product.model");

router.use(cors());

router
  .route("/")

  .get(async (req, res) => {
    try {
      const product = await Product.find({});

      res.json({ success: true, message: "Product List", product });
    } catch (error) {
      res.json({ success: false, errorMessage: error.message });
    }
  })

  .post(async (req, res) => {
    try {
      const newProduct = req.body;

      const newItem = new Product(newProduct);
      const response = await newItem.save();
      res.json({ success: true, message: "item added", response });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "error occured while adding product",
        errorMessage: error.message,
      });
    }
  });

router.param("productId", async (req, res, next, productId) => {
  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: "product not found" });
    }

    req.product = product;
    next();
  } catch {
    res
      .status(400)
      .json({ success: false, message: "error while retrivving product" });
  }
});

router
  .route("/:productId")

  .get((req, res) => {
    let { product } = req;
    product.__v = undefined;
    res.json({ success: true, item: product });
  })

  .post(async (req, res) => {
    const productUpdates = req.body;
    console.log(productUpdates);

    let { product } = req;

    newproduct = extend(product, productUpdates);
    product = await newproduct.save();
    res.json({ success: true, product });
  })

  .delete(async (req, res) => {
    let { product } = req;
    console.log(product);
    await product.remove();
    res.json({ success: true, product });
  });

module.exports = router;
