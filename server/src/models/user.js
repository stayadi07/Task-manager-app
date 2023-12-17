const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    // tokens: [{ token: { type: String, required: true } }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);