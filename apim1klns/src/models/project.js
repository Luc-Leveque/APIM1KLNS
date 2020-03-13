const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title: String,
    quotePrice: String,
    terminationPeriods: String,
    startDate:String, 
    endDate:String, 
    status: String,
    stacks: String, // à modifier
    costDays: String,
    idClient: { type: Schema.Types.ObjectId, ref: 'Client' },
    idUser: [{ type: Schema.Types.ObjectId, ref: 'User' }]
})

module.exports = mongoose.model('Project', projectSchema);