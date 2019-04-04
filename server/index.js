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
  await bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      console.log(err);
    } else {
      console.log(hash);
      let user = new User({
        email: req.body.email,
        password: hash
      });
      user.save().then(
        data => {
          res.send({
            sucess: true,
            data: data._id
          });
        },
        e => {
          console.log(e);
          res.send({ sucess: false, data: e.errmsg });
        }
      );
    }
  });
});

app.post("/login", async (req, res) => {
  // console.log("TCL: req", req.body);
  const data = await User.findOne({ email: req.body.email });
  // console.log("TCL: data", data);
  if (data) {
    await bcrypt.compare(req.body.password, data.password, (err, match) => {
      if (err) {
        console.log(err);
      } else {
        if (match) {
          res.send({ data: data._id, sucess: true });
        } else {
          res.send({ data: "Wrong password", sucess: false });
        }
      }
    });
  } else {
    res.send({
      data: "email id is wrong",
      sucess: false
    });
  }
});

app.listen(3001, () => {
  console.log("Server is running on localhost:3001");
});
