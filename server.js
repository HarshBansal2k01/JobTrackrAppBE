const express = require("express");
const app = express();
const cors = require("cors"); 
require("dotenv").config();

const mongoose = require("mongoose");

const port = 8080;

app.use(cors());

app.use(express.json());

const jobRoutes = require("./routes");  

app.use("/", jobRoutes);

// yoyoyoyoyoy

const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URL,
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

connectToDatabase();
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
