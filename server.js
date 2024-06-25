const express = require("express");
const app = express();
const cors = require("cors"); // Import cors
require("dotenv").config();

const mongoose = require("mongoose");

const port = 8080;

app.use(cors());

app.use(express.json());

const jobRoutes = require("./routes");

app.use("/", jobRoutes);



const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ihbbro14:H8IzAQuqieNz1aUR@jobtrackrcluster.pazg9fo.mongodb.net/JobTrackr?retryWrites=true&w=majority&appName=JobTrackrCluster",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("CONNECTED TO DATABASE SUCCESSFULLY");
  } catch (error) {
    console.error("COULD NOT CONNECT TO DATABASE:", error.message);
  }
};

// Connect to the database
connectToDatabase();
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
