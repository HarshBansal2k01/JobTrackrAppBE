// controllers/jobController.js

const UserDetails = require("./Models/UserDetails"); // Assuming you have a UserDetails model defined
const { Types: { ObjectId } } = require('mongoose');

const addJob = async (req, res) => {
  try {
    const { uid, company_name, role, salary_range, status, link } = req.body;

    // Create a new job instance
    const newJob = new UserDetails({
      uid,
      company_name,
      role,
      salary_range,
      status,
      link,
    });

    // Save the job to the database
    const savedJob = await newJob.save();

    // Send a response
    res.status(201).json({
      message: "Job added successfully",
      job: savedJob,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding job",
      error: error.message,
    });
  }
};

const getJobs = async (req, res) => {
  try {
    const jobs = await UserDetails.find();

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({
      message: "Error find Jobs",
      error: error.message,
    });
  }
};


const updateStatus = async (req, res) => {
  const { _id } = req.params;
  const { status } = req.body;

  try {
    const updatedJob = await UserDetails.findByIdAndUpdate(
      _id,
      { status: status },
      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).send('Job with the given ID was not found.');
    }

    res.send(updatedJob);
  } catch (error) {
    console.log("error",error.message)

    res.status(500).send('An error occurred while updating the status.');
  }
};
 
module.exports = { addJob, getJobs,updateStatus };
