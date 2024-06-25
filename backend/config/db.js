const mongoose = require("mongoose");

const uri = 'mongodb+srv://techtitans:gayatri%40123@techtitans.4kbmykp.mongodb.net/Shopbag?retryWrites=true&w=majority';

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(uri, {});
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit();
  }
};

module.exports = dbConnect;
