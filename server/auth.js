const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./model/User");
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      const { _json: userProfile } = profile;
      console.log({ profile });
      const user = await User.findOne({ uid: userProfile.sub });
      if (user == null) {
        const user = await User.create({
          uid: userProfile.sub,
          userName: userProfile.name,
          picture: userProfile.picture,
        });
        profile._json.id = user.id;
      } else {
        profile._json.id = user.id;
      }
      return cb(null, profile);
    }
  )
);

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});
