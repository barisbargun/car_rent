import { Schema, model } from 'mongoose';

const carouselSchema = new Schema({
  index: {
    type: Number,
    required: true
  },
  img: {
    type: Schema.Types.ObjectId,
    ref: 'Image',
    required: true
  },
  title: {
    type: String
  },
  desc: {
    type: String
  },
  vehicle_name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number
  },
  engine: {
    type: String
  },
  power: {
    type: String
  }
});

export default model('Carousel', carouselSchema);