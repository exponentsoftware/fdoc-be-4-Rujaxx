const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true,"Please add an username"],
        unique : true,
        trim : true,
        minlength : 5
    },
    email : {
        type : String,
        required : [true,"Please add an email"],
        unique : true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
          ]
    },
    phone: {
        type: String,
        validate: {
          validator: function(v) {
            return /\d{10}/.test(v);
          },
          message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required']
      },  
    role : {
        type : String,
        enum : ['admin','user'],
        default : 'user'
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 6,
      select: false
    },
    createdAt:{
        type : Date,
        default : Date.now
    },
    updatedAt: {
        type: Date,
        default: new Date()
    }
},{timestamps : true })



module.exports = mongoose.model('User',UserSchema);