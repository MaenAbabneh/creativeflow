import { Schema, model, models } from "mongoose";

export interface IUser {
  _id: string;
  name: string;
  username: string;
  email: string;
  bio?: string;
  image: string;
  location?: string;
  portifilo?: string;
  reputation?: number;
}

const userSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    bio: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: false,
    },
    portifilo: {
      type: String,
      required: false,
    },
    reputation: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const User = models?.User || model<IUser>("User", userSchema);

export default User;
