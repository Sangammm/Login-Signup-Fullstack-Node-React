const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const { User } = require("./models/User");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.post("/login", (req, res) => {});

app.post("/signup", (req, res) => {
  debugger;
  console.log("in server");
  console.log(req.body);
  console.log(req.body.email, req.body.password);

  let user = new User({
    email: req.body.email,
    password: req.body.password
  });
  user.save().then(
    data => {
      res.send({
        sucess: true,
        data: data
      });
    },
    e => {
      console.log(e);
      res.send({ sucess: false });
    }
  );
});

app.listen(3001, () => {
  console.log("Server is running on localhost:3001");
});
