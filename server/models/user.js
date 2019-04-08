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
  }
});
module.exports = {
  User
};
