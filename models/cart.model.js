const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
  name: { type: String, required: true },

  image: { type: String },
  price: { type: Number, required: true },
  url: {
    type: mongoose.SchemaTypes.Url,
    required: "Cannot enter a product wihtout URL",
  },
  inStock: { type: Boolean, required: true },
  fastDelivery: { type: Boolean, required: true },
  quantity: { type: Number },
});

const CartItem = mongoose.model("CartItem", cartSchema);

module.exports = CartItem;
