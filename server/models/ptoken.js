var mongoose = require("mongoose");
// mongoose.set("useCreateIndex", true);
var Ptoken = mongoose.model("Ptoken", {
  userid: {
    type: String,
    required: true
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
  },
  count: {
    type: Number,
    required: false,
    default: 0
  }
});
module.exports = {
  Ptoken
};
