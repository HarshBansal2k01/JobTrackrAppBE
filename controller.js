// controllers/jobController.js

const UserDetails = require('./Models/UserDetails'); // Assuming you have a UserDetails model defined

// Function to add a new job to the database
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
      message: 'Job added successfully',
      job: savedJob,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error adding job',
      error: error.message,
    });
  }
};

module.exports = { addJob };
