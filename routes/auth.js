const bcrypt = require("bcryptjs");
const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();
const User = require("../models/User");
const validations = require("../middleware/validations");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // Validate data before creating user
  const { error } = validations.registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //Validate whether user is already in database
  const emailExist = await User.findOne({ email });
  if (emailExist) {
    return res.status(400).send("Email already exists");
  }

  //Salt and Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = new User({
    name,
    email,
    password: hashPassword
  });

  try {
    const newUser = await user.save();
    const { _id, name, email, date } = newUser;
    res.send({ _id, name, email, date });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  //Validation
  const { error } = validations.loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  //If user is registered
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send("Email or Password is invalid");
  }
  //Validating passwords
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) {
    return res.status(400).send("Invalid Password");
  }

  //Create JWT
  const { _id } = user;
  const token = jwt.sign({ _id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
});

module.exports = router;
