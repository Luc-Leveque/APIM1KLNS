const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  clientname: String,
  adresse: String,
  city: String,
  cityCode: Number,
  lastName: String,
  lastName: String,
  telNumber: Number,
  email: String,
  idProject: String
})
module.exports = mongoose.model('Client', clientSchema);