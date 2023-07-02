const router = require("express").Router();
const withAuth = require("../utils/auth");
const { Post, User } = require("../models");

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User, attributes: { exclude: ["password"] } }],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("homepage", {
      posts: posts,
      loggedIn: req.session?.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session?.loggedIn) {
    return res.redirect("/");
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session?.loggedIn) {
    return res.redirect("/");
  }
  res.render("signup");
});

router.get('/dashboard', withAuth, (req, res) => {
  console.log('test dashboard')
  if (!req.session?.loggedIn) {
    return res.redirect("/");
  }
  res.render('dashboard', {
    loggedIn: req.session?.loggedIn,
  });
})

module.exports = router;
