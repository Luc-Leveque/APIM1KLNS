const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const sprintSchema = new Schema({
  title: String,
  dateStart: Number,
  dateEnd: Number,
  status: Number,
  idProject: [{ type: Schema.Types.ObjectId, ref: 'Project' }]
})
module.exports = mongoose.model('Sprint', sprintSchema);