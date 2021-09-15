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
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    }
});

const user = mongoose.Schema({
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      default: "",
    },
}, {versionKey: false, timestamps: true});

const Contact = mongoose.model("Contact", contact);
const User = mongoose.model("User", user);

module.exports = {
    Contact,
    User,
}