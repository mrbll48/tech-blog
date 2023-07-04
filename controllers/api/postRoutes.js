const router = require("express").Router();
const { Post, Comment, User } = require("../../models/index");
const withAuth = require("../../utils/auth");

router.get("/:id", withAuth, async (req, res) => {
  console.log(req.body);
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

// create a new post
router.post("/", async (req, res) => {
  console.log(req.session);
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
