import { TAB_LIST } from '@/constants/enum';
import mongoose from 'mongoose';
const { Schema, model } = mongoose

const menubarTabSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  index: {
    type: Number,
    required: true
  },
  type: {
    type: Number,
    enum: TAB_LIST,
    default: TAB_LIST.GRID_FOUR
  },
  children: [{
    type: Schema.Types.ObjectId,
    ref: "Menubar_vehicle"
  }]
});


export default model('Menubar_tab', menubarTabSchema);