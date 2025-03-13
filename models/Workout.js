const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  duration: { type: Number, required: true },
  dateAdded: { type: Date, default: Date.now },
  status: { type: String, default: "pending" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Workout", workoutSchema);