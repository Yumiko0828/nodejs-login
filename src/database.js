const { connect } = require("mongoose");
require("dotenv").config();

connect(process.env.URI, {
  useNewUrlParser: true,
})
  .then((db) => console.log("Connected:", db.connection.name))
  .catch((err) => console.log(err));
