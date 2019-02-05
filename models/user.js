const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema=new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024
    },
    isAdmin: Boolean
})

userSchema.methods.generateAuthToken=function () {
  const token =jwt.sign({_id: this._id,isAdmin: this.isAdmin},process.env.JWT_PRIVATE_KEY);       //signing the property for payload in jwt
  return token;
}


const User = mongoose.model('User',userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(3).max(255).required().email(),
    password: Joi.string().min(3).max(255).required(),
    isAdmin : Joi.boolean()
  };

  return Joi.validate(user, schema);
}


exports.User = User; 
exports.validate = validateUser;

