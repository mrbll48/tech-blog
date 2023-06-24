const router = require("express").Router();

router.post("/", async (req, res) => {
  User.create({
    name: req.body.name,
    password: req.body.password,
  }).then((dbUserData) => {
    res.status(200).json(dbUserData);
  });
});
