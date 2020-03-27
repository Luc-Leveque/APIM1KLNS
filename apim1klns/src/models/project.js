const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title: String,
    quotePrice: String,
    terminationPeriods: String,
    startDate:String, 
    endDate:String, 
    status: String,
    stacks: String, 
    costDays: String,
    idClient: { type: Schema.Types.ObjectId, ref: 'Client' },
    idSprint: [{ type: Schema.Types.ObjectId, ref: 'Sprint' }],
    idUser: [{ type: Schema.Types.ObjectId, ref: 'User' }]
})

module.exports = mongoose.model('Project', projectSchema);