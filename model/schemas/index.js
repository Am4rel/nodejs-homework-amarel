const mongoose = require("mongoose");

const contact = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
      },
    email: {
      type: String,
      required: [true, 'Set your email'],
      unique: true,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
});

const Contact = mongoose.model("Contact", contact);

module.exports = {
    Contact,
}