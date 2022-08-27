const express = require("express");
const { join } = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const morgan = require("morgan");

// initializations
const app = express();
require("./database");
require("./passport/local-auth");

// settings
app.set("port", process.env.PORT || 3000);
app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");

// middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "mysecretsession",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  app.locals.signinMessage = req.flash("signinMessage");
  app.locals.signupMessage = req.flash("signupMessage");
  app.locals.user = req.user;
  next();
});

// Static files
app.use(express.static(join(__dirname, "public")));

// routes
app.use("/", require("./routes/routes"));
app.use("/auth", require("./routes/auth.routes"));

// Starting the server
app.listen(app.get("port"), () => {
  console.clear();
  console.log("Server on port:", app.get("port"));
});
