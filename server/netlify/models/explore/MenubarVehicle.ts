import { Schema, model } from 'mongoose';

const menubarVehicleSchema = new Schema({
  index: {
    type: Number,
    required: true
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Menubar_tab',
    required: true
  },
  children: [{
    type: Schema.Types.ObjectId,
    ref: 'vehicle'
  }],
  img: {
    type: Schema.Types.ObjectId,
    ref: 'Image'
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true
  }
});

export default model('Menubar_vehicle', menubarVehicleSchema);