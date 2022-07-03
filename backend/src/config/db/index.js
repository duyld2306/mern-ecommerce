const mongoose = require("mongoose");
require("dotenv").config();

async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect database successfully!!!");
  } catch (error) {
    console.log("Connect database failure!!!");
  }
}

module.exports = { connect };
