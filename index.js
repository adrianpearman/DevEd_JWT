const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const express = require("express");

const app = express();
const authRoutes = require("./routes/auth.js");
const postRoutes = require("./routes/posts.js");
const dbConnection = require("./middleware/dbConnection");
const PORT = process.env.PORT || 3001;

dotenv.config();

//Connect to DB
dbConnection();

//Middlewares
app.use(bodyParser.json());
// Routes
app.use("/api", authRoutes);
app.use("/api/posts", postRoutes);

app.listen(PORT, (req, res) => {
  console.log(`Listening on PORT: ${PORT}`);
});

const l = {
  name: "adrian",
  email: "test@test.com",
  password: "dlkadlkjaldkjalkjsdakljsd"
};
