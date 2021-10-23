const router = require("express").Router();
const { User } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll();
    res.status(200).json(userData)
  } catch (err) {
    console.log(err);
    res.json(err)
  }
})

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { name: req.body.username },
    });

    if (!userData) {
      return res.render("login", { message: "user not found" });
    }

    const isValid = await userData.checkPassword(req.body.password);

    if (isValid) {
      req.session.save(() => {
        req.session.logged_in = true;
        req.session.user_id = userData.id
        return res.redirect("/dashboard");
      });
    } else {
      res.render("login", { message: "Password Incorrect" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/register", async (req, res) => {
  try {
    const user = await User.create(req.body);
    console.log(user);
    res.redirect("/login");
  } catch (err) {
    console.log(err);
    res.render('register', {message: "Registration unsuccessful, please enter valid values"})
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).redirect('/')
    });
  } else {
    res.render('/')
  }
});

module.exports = router;