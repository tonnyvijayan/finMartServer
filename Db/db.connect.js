const mongoose = require("mongoose");

async function initializeDbConnection() {
  try {
    await mongoose.connect(
      `mongodb+srv://tonnymdb:${process.env.DB_PWD}@neog-cluster.fra7p.mongodb.net/inventory?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log("Connection to db successful");
  } catch (error) {
    console.log("connection to db failed", error);
  }
}

module.exports = { initializeDbConnection };
