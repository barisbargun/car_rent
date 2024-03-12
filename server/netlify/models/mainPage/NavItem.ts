import { PAGE_LIST } from '@/constants/enum';
import { Schema, model } from 'mongoose';

const navItemSchema = new Schema({
  index: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true,
    unique:true
  },
  hyperLink: {
    type: Number,
    enum:PAGE_LIST,
    default:""
  }
});

export default model('Nav_item', navItemSchema);