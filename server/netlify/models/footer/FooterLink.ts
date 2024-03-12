import { Schema, model } from 'mongoose';

const footerLinkSchema = new Schema({
  index: {
    type: Number,
    required: true
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Footer_tab',
    required: true
  },
  title: {
    type: String,
    required: true,
    unique: true
  },
  link: {
    type: String,
    default: "/"
  }
});

export default model('Footer_link', footerLinkSchema);