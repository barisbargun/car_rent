import { Schema, model } from 'mongoose';

const imgSchema = new Schema({
  imgUrl: {
    type: String,
    required: true,
    unique: true
  },
  publicId: {
    type: String,
    required: true,
    unique: true
  }
});

export default model('Image', imgSchema);