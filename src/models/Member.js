import mongoose, { Schema } from 'mongoose';

const emailValidate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //eslint-disable-line

const schema = new Schema({
  name: {
    first: {
      type: String,
      trim: true,
      required: [true, 'First name required'],
      maxlength: 50
    },
    last: {
      type: String,
      trim: true,
      required: [true, 'Last name required'],
      maxlength: 50
    }
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator(v) {
        return emailValidate.test(v);
      },
      message: 'It is not a valid email'
    },
    required: [true, 'Email required'],
    maxlength: 200
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'Password required'],
    maxlength: 400
  },
  type: {
    type: Number,
    enum: [1, 2],
    required: true,
    trim: true
  },
  image: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }],
  submembers: [{
    type: Schema.Types.ObjectId,
    ref: 'Member'
  }],
});

export default mongoose.model('Member', schema);