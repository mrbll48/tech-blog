const router = require("express").Router();
const withAuth = require("../utils/auth");
const { Post, User } = require("../models");

router.get("/new-post", (req, res) => {
  res.render("newPost");
});

module.exports = router;
