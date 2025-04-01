import { connectDB } from "@/lib/db";
import { verifyJWT } from "@/lib/auth";
import Template from "@/models/Template";
import { handleError } from "@/utils/handleError";

// CREATE TEMPLATE
export async function POST(req) {
  try {
    await connectDB();
    const { user, error } = verifyJWT(req);
    if (error) return Response.json({ message: "Unauthorized" }, { status: 401 });

    const { name, content, category } = await req.json();
    if (!name || !category) return Response.json({ message: "Missing fields" }, { status: 400 });

    const newTemplate = new Template({
      name,
      content,
      category,
      user: user.userId,
    });

    await newTemplate.save();
    return Response.json({ message: "Template created", template: newTemplate });
  } catch (error) {
    return handleError(error, "CREATE_TEMPLATE");
  }
}

// GET ALL TEMPLATES
export async function GET(req) {
  try {
    await connectDB();
    const { user, error } = verifyJWT(req);
    if (error) return Response.json({ message: "Unauthorized" }, { status: 401 });

    const templates = await Template.find({ user: user.userId }).populate("category", "name");
    return Response.json(templates);
  } catch (error) {
    return handleError(error, "GET_TEMPLATES");
  }
}