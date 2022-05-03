const router = require("express").Router();
const passport = require("passport");
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("http://localhost:3000/");
  }
);

router.get("/user", (req, res) => {
  if (req.user == null) {
    return res.status(403).json({ message: "forbidden!!" });
  }
  return res.json(req.user);
});

router.get("/logout", (req, res) => {

  req.logout();
  res.redirect("/");
});

module.exports = router;
