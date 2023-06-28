const router = require("express").Router();
const User = require("../../models/User");

router.post("/", async (req, res) => {
  try {
    const userData = await User.create({
      name: req.body.username,
      password: req.body.password,
    });
    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData) {
      res.status(400).json({ message: "No user found with this email" });
      return;
    }
    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password" });
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
