/* eslint-disable func-names */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
        return /^(https?:\/{2})?(www\.)?(((([a-zA-Z0-9]+[-_.]?[a-zA-Z0-9]+|[a-z]{0,})+(?<=[a-z])\.[a-z]{2,10})(:([1-5][1-9]{4}|[6][0-5][0-5][0-3][0-5]|[1-9][0-9]{0,3}))?(\/[a-zA-Z0-9#.\/?_-]*\/?)*)|((([0-1][0-9]{2}|[2][0-5]{2}|[0-9]){0,2}(\.|:)){3}(([0-1][0-9]{2}|[2][0-5]{2}|[0-9]){0,2}(:([1-5][1-9]{4}|[6][0-5][0-5][0-3][0-5]|[1-9][0-9]{0,3}))?)(\/[a-zA-Z0-9#.\/?_-]+\/?)*)\/?#?)+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid url!`,
    },
    required: true,
  },
  email: {
    type: String,
    validate: {
      validator(v) {
        return /^([1-9a-zA-Z]+([-_]?[1-9a-zA-Z/d]+)+|[1-9a-zA-Z])@([1-9a-zA-Z/d]+(-?[1-9a-zA-Z/d]+)|[1-9a-zA-Z])\.[a-z]{2,7}$/.test(v);
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

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('users', userSchema);
