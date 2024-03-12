import { PAGE_LIST } from '@/constants/enum';
import { Schema, model } from 'mongoose';

const headerSchema = new Schema({
  index: {
    type: Number,
    enum: PAGE_LIST,
    required: true,
    unique: true
  },
  title: {
    type: String,
    default: ""
  },
  desc: {
    type: String,
    default: ""
  }
});

export default model('Header', headerSchema);