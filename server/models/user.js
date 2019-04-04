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
  }
});
module.exports = {
  User
};
