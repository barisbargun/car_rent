import { ROLE_LIST } from '@/constants/enum';
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: Number,
    enum: ROLE_LIST,
    default: ROLE_LIST.USER
  },
  img: {
    type: Schema.Types.ObjectId,
    ref: 'Image'
  },
  refreshToken: {
    type: String,
    unique: true
  }
});

export default model('User', userSchema);