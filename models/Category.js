import mongoose from "mongoose";

// 📁 Category schema para mag-group ng templates (like folders)
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    // 🔗 Link to User para alam kung kanino ang category
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
    collection: "nextjs_categories" // ← ito ang pangalan ng collection sa MongoDB
  }
);

// ✅ Export model safely (no overwrite error in dev)
export default mongoose.models.Category ||
  mongoose.model("Category", categorySchema);
