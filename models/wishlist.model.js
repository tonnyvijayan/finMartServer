const mongoose = require("mongoose");
const { Schema } = mongoose;

const wishListSchema = new Schema({
  productId: [{ type: Schema.Types.ObjectId, ref: "Product", unique: true }],
});

const WishList = mongoose.model("WishList", wishListSchema);

module.exports = WishList;
