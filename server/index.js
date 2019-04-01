const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const { User } = require("./models/user");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.post("/login", (req, res) => {});

app.post("/signup", (req, res) => {
  let user = new User({
    email: req.body.email,
    password: req.body.password
  });
  user.save().then(
    data => {
      res.sendStatus(200);
    },
    e => {
      console.log(e);
      res.sendStatus(400);
    }
  );
});

app.listen(3010, () => {
  console.log("Express server is running on localhost:3010");
});
