import { Schema, model } from 'mongoose';

const reviewSchema = new Schema({
  index: {
    type: Number,
    required: true
  },
  img: {
    type: Schema.Types.ObjectId,
    ref:'Image',
    required: true
  },
  fullname: {
    type: String,
    required: true,
    unique: true
  },
  occupation: {
    type: String,
    default: ""
  },
  desc: {
    type: String,
    required: true,
    unique: true
  }
});

export default model('Review', reviewSchema);