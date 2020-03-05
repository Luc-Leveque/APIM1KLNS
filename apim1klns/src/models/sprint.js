const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const sprintSchema = new Schema({
  // id: Number,
  title: String,
  dateStart: Number,
  dateEnd: Number,
  status: Number,
  idProject: String
})
module.exports = mongoose.model('Sprint', sprintSchema);