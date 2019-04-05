var mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
var User = mongoose.model("User", {
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  Etoken: {
    type: String,
    default: null,
    required: false
  },
  verified: {
    type: Boolean,
    default: false,
    required: false
  },
  Ptoken: {
    type: String,
    default: null,
    required: false
  },
  tokenexpire: {
    type: Number,
    required: false,
    default: null
  }
});
module.exports = {
  User
};
