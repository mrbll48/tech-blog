const router = require("express").Router();
const { User } = require("../../models/index");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    const userData = await User.create({
      name: req.body.name,
      password: req.body.password,
    });
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.loggedIn = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  console.log(req.body)
  try {
    const userData = await User.findOne({
      where: { name: req.body.name },
    });
    console.log(userData)
    if (!userData) {
      res.status(400).json({ message: "No user found with this username" });
      return;
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      userData.password
    );
    console.log(validPassword)
    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password" });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.loggedIn = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/logout", (req, res) => {
  console.log("test");
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
