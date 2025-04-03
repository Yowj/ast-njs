import { connectDB } from "@/lib/db";
import { verifyJWT } from "@/lib/auth";
import Category from "@/models/Category";
import { handleError } from "@/utils/handleError";

// ✏️ PATCH - Update a category
export async function PATCH(req, { params }) {
  try {
    await connectDB();
    const { user, error } = verifyJWT(req);
    if (error) return Response.json({ message: "Unauthorized" }, { status: 401 });

    const { name } = await req.json();
    if (!name) return Response.json({ message: "Category name is required" }, { status: 400 });

    const updated = await Category.findOneAndUpdate(
      { _id: params.id, user: user.userId },
      { name },
      { new: true }
    );

    if (!updated) return Response.json({ message: "Category not found" }, { status: 404 });

    return Response.json({ message: "Category updated", category: updated });
  } catch (error) {
    return handleError(error, "UPDATE_CATEGORY");
  }
}

// 🗑️ DELETE - Remove a category
export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { user, error } = verifyJWT(req);
    if (error) return Response.json({ message: "Unauthorized" }, { status: 401 });

    const deleted = await Category.findOneAndDelete({
      _id: params.id,
      user: user.userId,
    });

    if (!deleted) return Response.json({ message: "Category not found" }, { status: 404 });

    return Response.json({ message: "Category deleted successfully" });
  } catch (error) {
    return handleError(error, "DELETE_CATEGORY");
  }
}

//Get a category
export async function GET(req) {
  try {
    await connectDB();

    const { user, error } = verifyJWT(req);

    if (error) {
      return Response.json({ Message: "Error in JWT" }, { Status: "401" });
    }

    const categories = Category.find({ user: user._id });

    return Response.json(categories);
  } catch (error) {
    return handleError(error, "GET CATEGORIES REQUEST")
  }
}