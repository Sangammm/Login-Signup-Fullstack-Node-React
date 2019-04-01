var mongoose = require("mongoose");
var User = mongoose.model("User", {
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});
module.exports = {
  User
};
