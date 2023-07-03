const router = require("express").Router();
const { Comment } = require("../../models/index");

// create comment route
router.post("/", async (req, res) => {
  try {
    const commentData = await Comment.create({
      comment: req.body.comment,
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

// get all comments
router.get("/", async (req, res) => {
  try {
    const commentData = await Comment.findAll();

    const comments = commentData.map((comment) => comment.get({ plain: true }));
    res.render("/", { comments, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const commentData = await Comment.findByPk({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
