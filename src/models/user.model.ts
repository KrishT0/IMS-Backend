import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  role: {
    type: String,
    required: [true, "Role is required"],
    enum: ["intern", "mentor", "admin"],
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
      validator: function (v: string) {
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

const User = mongoose.model("User", userSchema);
export default User;
