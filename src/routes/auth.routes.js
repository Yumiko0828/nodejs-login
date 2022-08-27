const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.render("auth");
});

router.post(
  "/signup",
  passport.authenticate("local-signup", {
    successRedirect: "/profile",
    failureRedirect: "/auth",
    failureFlash: true,
  })
);

router.post(
  "/signin",
  passport.authenticate("local-signin", {
    successRedirect: "/profile",
    failureRedirect: "/auth",
    failureFlash: true,
  })
);

module.exports = router;
