const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: (props) => `${props.value} is not a valid url!`,
    },
    required: true,
  },
  email: {
    type: String,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: (props) => `${props.value} is not a valid e-mail!`,
    },
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, { versionKey: false });

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  if (password) {
    return this.findOne({ email }).select('+password')
      .then((user) => {
        if (!user) {
          return Promise.reject(new Error('Неправильная почта или пароль'));
        }
        return bcrypt.compare(password, user.password)
          .then((matched) => {
            if (!matched) {
              return Promise.reject(new Error('Неправильная почта или пароль'));
            }
            return user;
          });
      });
  }
  return Promise.reject(new Error('Отсутствует пароль'));
};

module.exports = mongoose.model('users', userSchema);
