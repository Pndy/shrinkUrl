//Dependencies
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var bcrypt = require('bcryptjs');

//Schema rules
var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "can't be blank"],
    match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
    index: true
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    index: true
  },
  hash: String
}, {
  timestamps: true
});

//Enable the uniqueValidator plugin
UserSchema.plugin(uniqueValidator, {
  message: 'is already taken.'
});

//Method to set user password
UserSchema.methods.setPassword = function (pass, cb) {
  this.hash = bcrypt.hashSync(pass, 12)
};

//Method to validate password
UserSchema.statics.authenticate = function (name, pass, fn) {
  User.findOne({
    username: name
  }, function (err, user) {
    if (!user) fn(err);
    if (bcrypt.compareSync(pass, user.hash)) {
      return fn(null, user)
    } else {
      return fn('invalid password')
    }
  })
};

// Export Schema
var User = mongoose.model('User', UserSchema);
module.exports = User;