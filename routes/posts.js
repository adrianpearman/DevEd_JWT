const express = require("express");
const router = express.Router();
const verify = require("../middleware/verifyToken");

router.get("/", verify, (req, res) => {
  res.json({
    posts: {
      title: "test title",
      description: "test description"
    }
  });
});

module.exports = router;
