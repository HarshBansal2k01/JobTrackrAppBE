
const mongoose = require('mongoose');

const UserDetailsSchema  = new mongoose.Schema({
  uid: { type: String, required: true },
  company_name: { type: String, required: true },
  role: { type: String, required: true },
  salary_range: { type: String, required: true },
  status: { type: String, required: true },
  link: { type: String, required: true },
});

const UserDetails = mongoose.model('UserDetails', UserDetailsSchema);

module.exports = UserDetails;
