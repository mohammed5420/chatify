const router = require("express").Router();
const passport = require("passport");
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/google" }),
  function (req, res) {
    // Successful authentication, redirect home.
    console.log(req.baseUrl);
    res.redirect(`${process.env.CLIENT_BASE_URI}/search`);
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

  return res.status(200).json({ message: "logged out" });
});

module.exports = router;
