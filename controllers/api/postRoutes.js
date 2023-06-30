const { Post } = require("../../models/index");

//create new post
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
