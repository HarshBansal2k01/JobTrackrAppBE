const express = require("express");
const app = express();
const cors = require("cors"); // Import cors

const mongoose = require("mongoose");

const port = 8080;

//middle ware cors

app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Import routes
const jobRoutes = require("./routes");

// Use routes
app.use("/", jobRoutes);

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://ihbbro14:H8IzAQuqieNz1aUR@jobtrackrcluster.pazg9fo.mongodb.net/JobTrackr?retryWrites=true&w=majority&appName=JobTrackrCluster",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
