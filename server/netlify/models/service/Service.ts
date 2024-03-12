import { Schema, model } from 'mongoose';

const serviceSchema = new Schema({
  index: {
    type: Number,
    required: true
  },
  img: {
    type: Schema.Types.ObjectId,
    ref:'Image'
  },
  title: {
    type: String,
    required: true,
    unique:true
  },
  desc: {
    type: String,
    required: true,
    unique:true
  }
});

export default model('Service', serviceSchema);