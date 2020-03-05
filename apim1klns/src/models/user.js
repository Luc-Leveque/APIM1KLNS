const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    company: String,
    siret: String,
    mail: String,
    phoneNumber: String,
    status: String,
    profil: String,
    idProject: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
})

module.exports = mongoose.model('User', userSchema);