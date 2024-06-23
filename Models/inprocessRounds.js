const mongoose = require('mongoose');

const inprocessRoundsSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  jobId: { type: String, required: true },
  process: { type: String, required: true }
});

const InprocessRounds = mongoose.model('InprocessRounds', inprocessRoundsSchema);

module.exports = InprocessRounds;
