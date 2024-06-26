import mongoose from "mongoose";
import { userType } from "../types";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  role: {
    type: String,
    required: [true, "Role is required"],
    enum: ["intern", "mentor", "admin"],
    default: "intern",
  },
  age: {
    type: Number,
    required: [true, "Age is required"],
  },
  mobile: {
    type: String,
    required: [true, "Mobile is required"],
    unique: true,
    validate: {
      validator: (v: string) => {
        return /^[6-9]\d{9}$/.test(v);
      },
      message: (props: { value: string }) =>
        `${props.value} is not a valid phone number!`,
    },
  },
  department: {
    type: String,
  },
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  intern: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "users",
  },
});

const User = mongoose.model<userType>("User", userSchema);
export default User;
