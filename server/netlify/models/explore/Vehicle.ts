import { Schema, model } from 'mongoose';

const vehicleSchema = new Schema({
  index: {
    type: Number,
    required: true
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Menubar_vehicle',
    required: true
  },
  img: {
    type: Schema.Types.ObjectId,
    ref: 'Image',
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  fuel: {
    type: String,
  },
  drivetrain: {
    type: String,
  },
  wheel: {
    type: String,
  },
});

export default model('vehicle', vehicleSchema);