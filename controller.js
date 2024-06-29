const UserDetails = require("./Models/UserDetails");
const InprocessRounds = require("./Models/inprocessRounds");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const {
  Types: { ObjectId },
} = require("mongoose");

const addJob = async (req, res) => {
  try {
    const { uid, company_name, role, salary_range, status, link } = req.body;
    const newJob = new UserDetails({
      uid,
      company_name,
      role,
      salary_range,
      status,
      link,
    });

    const savedJob = await newJob.save();

    res.status(201).json({
      message: "Job added successfully",
      job: savedJob,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding job",
      error: error.message,
    });
    console.log("addjob", error.message);
  }
};

const addProcess = async (req, res) => {
  try {
    const { uid, jobId, process } = req.body;

    let existingDocument = await InprocessRounds.findOne({ jobId });

    if (existingDocument) {
      if (existingDocument.process) {
        existingDocument.process += `,${process}`;
      } else {
        existingDocument.process = process;
      }

      const updatedDocument = await existingDocument.save();

      res.status(200).json({
        message: "Process updated successfully",
        process: updatedDocument,
      });
    } else {
      const newProcess = new InprocessRounds({
        uid,
        jobId,
        process,
      });

      const savedProcess = await newProcess.save();

      res.status(201).json({
        message: "Process added successfully",
        process: savedProcess,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error updating process",
      error: error.message,
    });
    console.log("addProcess", error.message);
  }
};

const getJobs = async (req, res) => {
  const uid = req.query.uid;
  try {
    const jobs = await UserDetails.find({ uid: uid });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({
      message: "Error find Jobs",
      error: error.message,
    });
  }
};

const getProcess = async (req, res) => {
  const jobId = req.query.jobId;
  try {
    const jobs = await InprocessRounds.find({ jobId: jobId });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({
      message: "Error find Jobs",
      error: error.message,
    });
  }
};

const updateStatus = async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  const { status } = req.body;
  console.log(req.body);
  try {
    const updatedJob = await UserDetails.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).send("Job with the given ID was not found.", id);
    }

    res.status(200).send("status updated");
  } catch (error) {
    console.log("error", error.message, id);

    res.status(500).send("An error occurred while updating the status.");
  }
};

const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Deleting job with ID:", id);

    const job = await UserDetails.findByIdAndDelete(id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json({ message: "Job deleted successfully", job });
  } catch (error) {
    console.error("Error deleting job:", error.message);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

const payment = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: item.name,
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        };
      }),
      success_url: "https://master--jobtrackrapp.netlify.app/success" || "https://jobtrackrapp.netlify.app/success",
      cancel_url: "https://master--jobtrackrapp.netlify.app/cancelled" || "https://jobtrackrapp.netlify.app/cancelled",
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Error creating Stripe session:", err);

    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addJob,
  getJobs,
  updateStatus,
  deleteJob,
  addProcess,
  getProcess,
  payment,
};
