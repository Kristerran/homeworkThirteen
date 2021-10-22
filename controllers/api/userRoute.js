const router = require("express").Router();
const { User } = require("../../models");

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    if (!userData) {
      return res.render("login", { message: "user not found" });
    }

    const isValid = await userData.checkPass(req.body.password);

    if (isValid) {
      req.session.save(() => {
        req.session.is_logged_in = true;
        req.session.user = {
          username: userData.username,
          bio: userData.bio,
        };
        return res.redirect("/");
      });
    } else {
      console.log("🤷‍♂️");
      res.render("login", { message: "chiggity check yo password" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/register", async (req, res) => {
  try {
    const user = await User.create(req.body);
    console.log(user);
    res.redirect("/register");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;