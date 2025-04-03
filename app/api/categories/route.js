import { connectDB } from "@/lib/db";
import { handleError } from "@/utils/handleError";
import { verifyJWT } from "@/lib/auth";
import Category from "@/models/Category";

//Post a new category
export async function POST(req) {
  try {
    await connectDB();

    const { user, error } = verifyJWT(req);

    if (error) {
      return Response.json({ Message: "Error in JWT" }, { Status: "401" });
    }

    const { categoryName } = await req.json();

    if (!categoryName) {
      return Response.json(
        { Message: "Category Name is required" },
        { Status: "400" }
      );
    }

    const newCategory = new Category({ name: categoryName, user: user.userId });

    await newCategory.save();
    return Response.json({
      message: "Category created successfully.",
      category: newCategory,
    });
  } catch (error) {
    return handleError(error, "CREATE_CATEGORY");
  }
}


//Get all category
export async function GET(req) {
  try {
    await connectDB();

    const { user, error } = verifyJWT(req);

    if (error) {
      return Response.json({ Message: "Error in JWT" }, { Status: "401" });
    }

    const allCategories = await Category.find();

    return Response.json(allCategories);
  } catch (error) {
    return handleError(error, "GET CATEGORIES REQUEST")
  }
}