const router = require("express").Router();
const { Post, Comment, User } = require("../../models/index");
const withAuth = require("../../utils/auth");

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    if (!req.session?.loggedIn) {
      return res.redirect("/");
    }
    const postData = await Post.findAll({
      include: [{ model: User, attributes: { exclude: ["password"] } }],
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

// get all posts for dashbaord
// router.get("/dashboard", async (req, res) => {
//   console.log("hello");
//   try {
//     const postData = await Post.findAll({
//       include: [{ model: User, attributes: { exclude: ["password"] } }],
//     });
//     const posts = postData.map((post) => post.get({ plain: true }));
//     res.render("dashboard", {
//       posts: posts,
//       loggedIn: req.session?.loggedIn,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// get one post
router.get("/:id", async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: [title, contents, created_at],
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
          attributes: ["id", "comment", "user_id", "created_at"],
          include: {
            model: User,
            attributes: ["name"],
          },
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts);

    res.json("dashboard", {
      posts,
      loggedIn: req.session?.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new post
router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const newPost = await Post.create({
      title: req.body.title,
      contents: req.body.contents,
      user_id: req.session.user_id,
    });
    console.log(newPost);
    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

// update a post
router.put("/:id", async (req, res) => {
  try {
    const postData = Post.update(
      {
        title: req.body.title,
        contents: req.body.contents,
      },
      {
        where: req.params.id,
      }
    );

    if (!postData) {
      res.status(400).json({ message: "There is no post with this ID" });
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a post
router.delete("/:id", async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!postData) {
      res.status(404).json({ message: "No post with this ID" });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;
