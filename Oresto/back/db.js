const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose
    .connect("mongodb://localhost/test", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => console.log("Connected to Mongo.."))
    .catch((err) => console.error("Could not connect to Mongo: ", err));
};

module.exports = connectDB;
