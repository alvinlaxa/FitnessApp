const express = require("express");
const workoutController = require("../controllers/workout");

const router = express.Router();

router.post("/addWorkout", workoutController.addWorkout);
router.get("/getMyWorkouts", workoutController.getMyWorkouts);
router.patch("/updateWorkout/:id", workoutController.updateWorkout);
router.delete("/deleteWorkout/:id", workoutController.deleteWorkout);
router.patch("/completeWorkoutStatus/:id", workoutController.completeWorkoutStatus);

console.log(workoutController);

module.exports = router;