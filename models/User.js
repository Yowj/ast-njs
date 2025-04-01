import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // tanggalin leading/trailing spaces
    },
    email: {
      type: String,
      required: true,
      unique: true, // dapat unique ang email
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "nextjs_users",
  }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
