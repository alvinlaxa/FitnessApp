const Workout = require("../models/Workout");

module.exports.addWorkout = async (req, res) => {
  try {
    const newWorkout = new Workout({ ...req.body, user: req.user.id });
    await newWorkout.save();
    res.status(201).send({ message: "Workout added successfully" });
  } catch (error) {
    res.status(500).send({ error: "Failed to add workout" });
  }
};

module.exports.getMyWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user.id });
    res.status(200).send(workouts);
  } catch (error) {
    res.status(500).send({ error: "Failed to retrieve workouts" });
  }
};

module.exports.updateWorkout = async (req, res) => {
  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!workout) return res.status(404).send({ error: "Workout not found" });
    res.status(200).send({
      message: "Workout updated successfully",
      updatedWorkout: workout
    });
  } catch (error) {
    res.status(500).send({ error: "Failed to update workout" });
  }
};

module.exports.deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!workout) return res.status(404).send({ error: "Workout not found" });
    res.status(200).send({ message: "Workout deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: "Failed to delete workout" });
  }
};

module.exports.completeWorkoutStatus = async (req, res) => {
  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { status: "completed" },
      { new: true }
    );
    if (!workout) return res.status(404).send({ error: "Workout not found" });
    res.status(200).send({
      message: "Workout status updated successfully",
      updatedWorkout: workout
    });
  } catch (error) {
    res.status(500).send({ error: "Failed to update workout status" });
  }
};

