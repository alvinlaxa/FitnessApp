const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const workoutRoutes = require("./routes/workout");
const userRoutes = require("./routes/user");
const auth = require("./auth");

const app = express();

mongoose.connect("mongodb+srv://admin:admin123@wdc028-course-booking.tadnv.mongodb.net/fitness-tracking?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use("/workouts", auth.verify, workoutRoutes);
app.use("/users", userRoutes);

if (require.main === module) {
  app.listen(process.env.PORT || 4000, () => {
    console.log(`API is now online on port ${process.env.PORT || 4000}`);
  });
}

module.exports = { app, mongoose };
