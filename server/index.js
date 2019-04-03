const express = require("express");
const bodyParser = require("body-parser");
const { User } = require("./models/User");
var mongoose = require("mongoose");
var cors = require("cors");
const bcrypt = require("bcrypt");
const myPlaintextPassword = "meranamesangam";
const l = console.log();
mongoose.connect("mongodb://localhost:27017/Myinsta");
mongoose.Promise = global.Promise;

console.log(mongoose.connection.readyState);

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//post signup
app.post("/signup", async (req, res) => {
  console.log(req.body);
  await bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      console.log(err);
    } else {
      console.log(hash);
      console.log(hash1);
      let user = new User({
        email: req.body.email,
        password: hash
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
    }
  });
});

app.listen(3001, () => {
  console.log("Server is running on localhost:3001");
});
