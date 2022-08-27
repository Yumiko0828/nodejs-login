const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { uuid } = require("yutil.js");

// Models
const User = require("../models/User");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const id = uuid.v1(18);
      const bemail = req.body.email;
      const email = await User.findOne({ email: bemail });
      const user = await User.findOne({ username: username });

      if (email) {
        return done(
          null,
          false,
          req.flash("signupMessage", "The email is already taken.")
        );
      } else if (user) {
        return done(
          null,
          false,
          req.flash("signupMessage", "The name is already taken.")
        );
      }
      const newUser = new User();

      newUser.uid = id;
      newUser.username = username;
      newUser.email = bemail;
      newUser.password = newUser.encryptPassword(password);

      await newUser.save();
      return done(null, newUser);
    }
  )
);

passport.use(
  "local-signin",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, req.flash("signinMessage", "User not found!"));
      }
      if (!user.comparePassword(password)) {
        return done(
          null,
          false,
          req.flash("signinMessage", "Incorrect password!")
        );
      }
      return done(null, user);
    }
  )
);
