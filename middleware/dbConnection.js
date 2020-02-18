const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect(
    process.env.DB_CONNECT,
    { useUnifiedTopology: true, useNewUrlParser: true },
    () => {
      console.log("connected to db");
    }
  );
};
