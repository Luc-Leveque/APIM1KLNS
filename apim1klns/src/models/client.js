const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    corporateName: String,
    adress: String,
    contactLastName: String,
    contactFirstName: String,
    phoneNumber: String,
    mail: String,
})

module.exports = mongoose.model('Client', clientSchema);