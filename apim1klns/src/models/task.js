const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: String,
  description: String,
  status: Number,
  time: Number,
})
module.exports = mongoose.model('Task', taskSchema);