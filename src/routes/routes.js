const router = require("express").Router();
const passport = require("passport");
const isAuth = require("./auth");

router.get("/", (req, res, next) => {
  res.render("index", {
    user: req.user,
  });
});

router.get("/profile", isAuth, (req, res, next) => {
  res.render("profile");
});

router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
