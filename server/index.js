const express = require("express");
const bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cors = require("cors");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const { User } = require("./models/user");
const { Ptoken } = require("./models/ptoken");
mongoose.connect("mongodb://localhost:27017/Myinsta", {
  useNewUrlParser: true
});
mongoose.Promise = global.Promise;
//console.log(mongoose.connection.readyState);

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

const sendmail = (email, title, body) => {
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
    subject: title,
    html: body
  };
  transporter.sendMail(mailOptions, function(err, info) {
    if (err) console.log(err);
  });
};

app.post("/signup", async (req, res) => {
  const random = makeid(20);
  const link = `http://localhost:3001/verify/${random}`;
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
            "Login karna he to verify kr pehle",
            `<h2>Copy below link and paste in browser to verify</h2> <a href="${link}">${link}</a>`
          );
        },
        e => {
          console.log(e);
          res.send({ sucess: false, data: "Email Id already exists" });
        }
      );
    }
  });
});
app.get("/verify/:id", async (req, res) => {
  console.log("Verifying");
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
        "Email Verifed sucessfully <br><h2>goto <a href='http://localhost:3000/login'>Login</a></h2>"
      );
    }
  });
});

app.post("/login", async (req, res) => {
  console.log("TCL: req", req.body);
  const data = await User.findOne({ email: req.body.email });
  console.log("TCL: data", data);
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
  const data = await User.find(req.body);

  if (data) {
    const random = await makeid(20);
    const link = `http://localhost:3000/ResetPass/${random}`;
    const body = `<h2><a href = "${link}">Reset Password</a><h2>`;
    sendmail(data[0].email, "Age se yad rakhna Password", body);
    const time = Date.now() + 600000;

    const tdata = await Ptoken.find({ userid: data[0].id });
    if (tdata.length === 1) {
      await Ptoken.findOneAndUpdate(
        { _id: tdata[0]._id },
        {
          $set: {
            userid: data[0]._id,
            Ptoken: random,
            tokenexpire: Date.now(),
            count: 0
          }
        },
        { new: true },
        (err, doc) => {
          if (err) {
            console.log("errorin update", err);
            res.status(500).send({
              sucess: false,
              message: "Try Again Later"
            });
          } else {
            console.log(doc);
            res.send({
              sucess: true,
              message: "Click the link We sent you on your mail"
            });
          }
        }
      );
    } else {
      const ptoken = new Ptoken({
        _id: new mongoose.Types.ObjectId(),
        userid: data[0]._id,
        Ptoken: random,
        tokenexpire: Date.now(),
        count: 0
      });
      ptoken.save().then(
        data => {
          console.log(link);
          res.status(200).send({
            sucess: true,
            data: "Click the link We sent you on your mail"
          });
        },
        e => {
          console.log("error=", e);
          res.status(500).send({
            sucess: false,
            data: "Try Again Later"
          });
        }
      );
    }
  } else {
    res.send({ sucess: false, data: "Could not find that email id" });
  }
});

app.post("/verify", async (req, res) => {
  console.log(req.body);
  const data = await Ptoken.findOne(req.body);

  if (data.count === 0) {
    const time = Date.now();
    // console.log(time);
    // console.log(time - data.tokenexpire);
    if (time - data.tokenexpire > 600000) {
      res.send({
        sucess: false,
        message: "Link gets expired in 10 minutes"
      });
    } else {
      res.send({
        sucess: true,
        message: data.userid
      });
    }
  } else {
    res.send({ sucess: false, message: "You can use link only once" });
  }
});

app.post("/changepass", async (req, res) => {
  await bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      console.log("encryption error", err);
      res.send({
        sucess: false,
        message: "Error occured in encryption"
      });
    } else {
      User.findByIdAndUpdate(
        req.body.userid,
        { $set: { password: hash } },
        err => {
          if (err) {
            console.log("error in chngepass", err);
            res.send({
              sucess: false,
              message: "Error occured"
            });
          } else {
            res.send({
              sucess: true,
              message: "Password Changed Sucessfully"
            });
          }
        }
      );
    }
  });
});

app.listen(3001, () => {
  console.log("Server is running on localhost:3001");
});
