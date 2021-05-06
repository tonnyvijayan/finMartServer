const mongoose = require("mongoose");
const { Schema } = mongoose;
require("mongoose-type-url");
// To create a db entry in mongoose,
// step1  create a schema using the Schema class from mongoose
const productSchema = new Schema(
  // {
  //   name: { type: String, required: true },

  //   productModelNumber: {
  //     type: String,
  //     required: "Cannot enter a product without model number",
  //     unique: true,
  //   },
  //   price: { type: Number, required: true },
  //   url: {
  //     type: mongoose.SchemaTypes.Url,
  //     required: "Cannot enter a product wihtout URL",
  //   },
  //   productDescription: {
  //     type: String,
  //     minLength: [300, "Description must be 300 characters"],
  //   },
  // },
  {
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
  },
  { timestamps: true }
);

// // creating schema for category
// const categorySchema= new Schema({name:String,price:Number})

// step2 create a model(collection in mongodb) using the shcema created, collection will be the lower case plural of the model name
const Product = mongoose.model("Product", productSchema);

// // creating model for category
// const Category=mongoose.model('Category',categorySchema)

// const Item=new Category({name:"tea",price:566})
// Item.save()

// Category.find({}).then(resp=>console.log(resp))

// to read data from model(collection) we use find on the product model
// and to creat a new document or data we use new on the collection name and then save it
// const Item=new Product({name:"suits",price:10000})
// Item.save().then(response=>console.log(response))

// Product.find({}).then(data=>console.log(data))

module.exports = Product;
// module.exports= Category
