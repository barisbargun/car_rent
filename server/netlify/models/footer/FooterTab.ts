import { Schema, model } from 'mongoose';

const footerTabSchema = new Schema({
  index: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true,
    unique: true
  },
  children: [{
    type: Schema.Types.ObjectId,
    ref: "Footer_link"
  }]
});

export default model('Footer_tab', footerTabSchema);