import { Schema, model } from 'mongoose';

const siteValuesSchema = new Schema({
  navName: {
    type: String,
    unique: true
  },
  navImg: {
    type: Schema.Types.ObjectId,
    ref: 'Image'
  },
  logoImg: {
    type: Schema.Types.ObjectId,
    ref: 'Image',
    required: true
  },
  serviceImg: {
    type: Schema.Types.ObjectId,
    ref: 'Image',
    required: true
  },
  footerDesc: {
    type: String,
    required: true,
    unique: true
  }
});

export default model('Site_value', siteValuesSchema);