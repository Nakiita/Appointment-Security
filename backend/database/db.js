const mongoose = require("mongoose");

const connectDB = async () => {
  const { connection } = await mongoose.connect(process.env.DB_URL);
  console.log(`MongoDB is connected at:${connection.host}`.cyan.underline.bold);
};
module.exports = connectDB;
