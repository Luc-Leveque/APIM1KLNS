const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const sprintSchema = new Schema({
  title: String,
  dateStart: String,
  dateEnd: String,
  status: Number,
  idTask: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
})
module.exports = mongoose.model('Sprint', sprintSchema);