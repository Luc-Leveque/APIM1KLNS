const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const passportLocalMongoose = require('passport-local-mongoose');

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

userSchema.plugin(passportLocalMongoose, {
    usernameField: 'email'
  });

module.exports = mongoose.model('User', userSchema);