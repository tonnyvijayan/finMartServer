const express = require("express");
const router = express.Router();
const cors = require("cors");
const WishList = require("../models/wishlist.model.js");
const Product = require("../models/product.model.js");
const { route } = require("./product.router.js");
const { extend } = require("lodash");

router.use(cors());

router
  .route("/")
  .get(async (req, res) => {
    try {
      const wishListItems = await WishList.find({}).populate("productId");

      res.json({
        success: true,
        message: "successfully fetched item",
        wishListItems,
      });
    } catch (error) {
      res.json({ success: false, message: "failed fetching wishListItems" });
    }
  })

  .post(async (req, res) => {
    try {
      const { productId } = req.body;
      console.log({ productId });
      const wishListItem = new WishList({
        productId: [],
      });

      const savedWishListId = await wishListItem.save();
      res.json({ success: true, message: "item added", savedWishListId });
    } catch (error) {
      res.json({
        success: false,
        message: "error adding item to wishList",
        errorMessage: error.message,
      });
    }
  });

router.param("wishListId", async (req, res, next, wishListId) => {
  try {
    const wishListProduct = await WishList.findById(wishListId).populate(
      "productId"
    );

    req.product = wishListProduct;
    next();
  } catch (error) {
    console.log("error finiding wishlist product");
  }
});

router
  .route("/:wishListId")
  .get((req, res) => {
    const item = req.product;
    console.log({ item });
    res.json({ success: true, wishListItem: item.productId });
  })

  .post(async (req, res) => {
    const wishListItem = req.product;
    const updateForWishListItem = req.body;

    const finalUpdateProduct = {
      productId: [
        ...wishListItem.productId,
        ...updateForWishListItem.productId,
      ],
    };

    const newWishListItem = extend(wishListItem, finalUpdateProduct);
    const updatedWishListItem = await newWishListItem.save();

    await updatedWishListItem.execPopulate("productId");
    console.log("populating here", updatedWishListItem);
    res.json({ updatedWishListItem });
  })

  .delete(async (req, res) => {
    const wishListItem = req.product;
    const wishListItemRemoved = await wishListItem.remove();
    res.json({ success: true, message: "item Deleted", wishListItemRemoved });
  });

router.route("/:wishListId/:wishListItemId").delete(async (req, res) => {
  const { wishListItemId } = req.params;
  const { wishListId } = req.params;
  const wishList = req.product;

  console.log("productid length before filter", wishList.productId.length);
  const filteredWishList = wishList.productId.filter((item) => {
    return item._id.toString() !== wishListItemId;
  });

  const finalUpdatedWishListItems = {
    productId: filteredWishList,
  };

  const mergedWishListItems = extend(wishList, finalUpdatedWishListItems);
  await mergedWishListItems.save();

  res.json({ success: true });
});

module.exports = router;
