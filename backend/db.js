const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const connectDB = async () => {
  try {
    // const conn = await mongoose.connect(process.env.MONGO_URI, {
    //   dbName: "chatapp",
    // });
    const conn = await mongoose.connect("mongodb://127.0.0.1:27017/chatapp")

    console.log(`MongoDB connected !`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
