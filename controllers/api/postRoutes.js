const router = require("express").Router();
const { Post, Comment, User } = require("../../models/index");

// get post by user

router.get("/:id", async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: [id, title, contents, created_at],
      include: [
        {
          model: User,
          attributes: "name",
        },
        {
          model: Comment,
          attributes: ["id", "comment", "user_id", "created_at"],
          include: {
            model: User,
            attributes: "name",
          },
        },
      ],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("homepage", {
      posts,
      loggedIn: req.session?.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      contents: req.body.contents,
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

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
