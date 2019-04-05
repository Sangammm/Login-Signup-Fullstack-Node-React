const express = require("express");
const bodyParser = require("body-parser");
const { User } = require("./models/User");
var mongoose = require("mongoose");
var cors = require("cors");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

//connection
mongoose.connect("mongodb://localhost:27017/Myinsta");
mongoose.Promise = global.Promise;

console.log(mongoose.connection.readyState);

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function makeid(length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

const sendmail = (email, random, body) => {
  const link = `localhost:3001/verify/${random}`;
  var transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "sangamrajpara1998@gmail.com",
      pass: "ommetalcast"
    }
  });
  const mailOptions = {
    from: "sangamrajpara1998@gmail.com",
    to: email,
    subject: "Verify kar le.",
    html: body
  };
  transporter.sendMail(mailOptions, function(err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
};

//post signup
app.post("/signup", async (req, res) => {
  const random = makeid(20);
  await bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      console.log(err);
    } else {
      console.log(hash);
      let user = new User({
        email: req.body.email,
        password: hash,
        Etoken: random
      });
      user.save().then(
        data => {
          res.send({
            sucess: true,
            data: data._id
          });
          sendmail(
            data.email,
            random,
            `<h2>Copy below link and paste in browser to verify</h2> <a href="${link}"> Click here </a> <br/>${link}`
          );
        },
        e => {
          console.log(e);
          res.send({ sucess: false, data: e.errmsg });
        }
      );
    }
  });
});

app.get("/verify/:id", async (req, res) => {
  var query = { Etoken: req.params.id };
  User.findOneAndUpdate(query, { $set: { verified: true } }, function(
    err,
    doc
  ) {
    if (err) {
      console.log(err);
      return res.status(500).send("verification failed");
    }
    {
      return res.send(
        "Email Verifed sucessfully goto <a href='http://localhost:3000/login'>Login</a>"
      );
    }
  });
});

app.post("/login", async (req, res) => {
  // console.log("TCL: req", req.body);
  const data = await User.findOne({ email: req.body.email });
  // console.log("TCL: data", data);
  if (data) {
    if (data.verified === false) {
      res.send({
        sucess: false,
        data: "Verify Your Email Address to Login"
      });
      res.end();
    } else {
      await bcrypt.compare(req.body.password, data.password, (err, match) => {
        if (err) {
          console.log(err);
        } else {
          if (match) {
            res.send({ data: data._id, sucess: true });
          } else {
            res.send({ data: "Wrong password", sucess: false });
            res.end();
          }
        }
      });
    }
  } else {
    res.send({
      data: "email id is wrong",
      sucess: false
    });
  }
});

app.post("/sendresetpass", async (req, res) => {
  const random = makeid(20);
  const data = await User.findOne({ email: req.body.email });
  if (data) {
    sendmail(data.email, random, `http://localhost:3000/ResetPass/${random}`);
    User.findByIdAndUpdate(
      data._id,
      {
        $set: { Ptoken: random, tokenexpire: new Date().now() + 100 * 60 * 10 }
      },
      function(err, doc) {
        if (err) {
          console.log(err);
          return res.status(500).send("verification failed");
        } else {
          return res.send({
            sucess: true,
            data: doc
          });
        }
      }
    );
  } else {
    res.send({ sucess: false, data: "Could not find that email id" });
  }
});

app.listen(3001, () => {
  console.log("Server is running on localhost:3001");
});
