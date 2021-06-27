const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    role: String,
},
{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },  versionKey: false });

userSchema.index({email: 1}, { unique: true });

module.exports = mongoose.model('Users', userSchema);