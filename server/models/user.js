var mongoose = require("mongoose");
var User = mongoose.model("User", {
  email: {
    type: String
  },
  password: {
    type: String
  }
});
module.exports = {
  User
};
