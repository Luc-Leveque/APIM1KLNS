const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: String,
  description: String,
  status: Number,
  time: Number,
  idSprint: [{ type: Schema.Types.ObjectId, ref: 'Sprint' }],
})
module.exports = mongoose.model('Task', taskSchema);