const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.URI, {
    useNewUrlParser: true,
  })
  .then((db) => console.log("Connected:", db.connection.name))
  .catch((err) => console.log(err));
