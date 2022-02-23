import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Input Name",
    },
    email: {
      type: String,
      trim: true,
      required: "Enter Email",
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      minlength: 6,
      required: true,
    },
    picture: {
      type: String,
      default: "/avatar.png",
    },
    role: {
      type: [String],
      default: ["Subscriber"],
      enum: ["Subscriber", "Instructor", "Admin"],
    },
    stripe_account_id: "",
    stripe_seller: {},
    stripeSession: {},
    passwordResetCode: {
      data: String,
      default: "",
    },
  },

  { timestamps: true }
);

export default mongoose.model("User", userSchema);
