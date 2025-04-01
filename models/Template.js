import mongoose from "mongoose";

// ✅ Schema para sa mga template (e.g. content na ginagamit ng authors)
const templateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  // 🔗 Link to category (optional)
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  // 🔗 Link to user
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
}, {
  timestamps: true,
},
{
  collection: "nextjs_templates" // ← ito ang pangalan ng collection sa MongoDB
});

// ✅ Safe export
export default mongoose.models.Template || mongoose.model("Template", templateSchema);
