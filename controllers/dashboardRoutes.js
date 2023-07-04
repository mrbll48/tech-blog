const router = require("express").Router();
const withAuth = require("../utils/auth");
const { Post, User, Comment } = require("../models");

router.get("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User, attributes: { exclude: ["password"] } }],
      where: {
        user_id: req.session.user_id,
      },
    });
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("dashboard", {
      posts,
      loggedIn: req.session?.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
          include: {
            model: User,
            attributes: ["name"],
          },
        },
      ],
    });

    const post = postData.get({ plain: true });
    console.log(post);
    res.render("post", {
      ...post,
      loggedIn: req.session?.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/new-post", withAuth, (req, res) => {
  res.render("newPost", { loggedIn: req.session?.loggedIn });
});

// router.get("/dashboard", withAuth, async (req, res) => {
//   try {
//     const postData = await Post.findAll({
//       include: [{ model: User, attributes: { exclude: ["password"] } }],
//     });
//     const posts = postData.map((post) => post.get({ plain: true }));

//     res.render("dashboard", {
//       posts,
//       loggedIn: req.session?.loggedIn,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
