const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// uuid
function uuid(len) {
  let l = "0123456789";
  let id = "";
  for (var i = 0; i < len; i++) {
    id += l[Math.floor(Math.random() * 10)];
  }
  return id;
}

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
      const id = uuid(18)
      const email = req.body.email;
      const user = await User.findOne({ email: email });
      const nick = await User.findOne({ username: username });
      console.log(user);
      if (user) {
        return done(
          null,
          false,
          req.flash("signupMessage", "The email is already taken.")
        );
      } else if (nick) {
        return done(
          null,
          false,
          req.flash("signupMessage", "The name is already taken.")
        );
      } else if (!user && !nick) {
        const newUser = new User();
        newUser.uid = id;
        newUser.username = username;
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        console.log(newUser);
        await newUser.save();
        return done(null, newUser);
      }
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
