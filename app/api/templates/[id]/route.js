import { connectDB } from "@/lib/db";
import { verifyJWT } from "@/lib/auth";
import Template from "@/models/Template";
import { handleError } from "@/utils/handleError";

// GET TEMPLATE BY ID
export async function GET(req, { params }) {
  try {
    await connectDB();
    const { user, error } = verifyJWT(req);
    if (error) return Response.json({ message: "Unauthorized" }, { status: 401 });

    const template = await Template.findOne({ _id: params.id, user: user.userId }).populate("category");
    if (!template) return Response.json({ message: "Template not found" }, { status: 404 });

    return Response.json(template);
  } catch (error) {
    return handleError(error, "GET_TEMPLATE_BY_ID");
  }
}

// UPDATE TEMPLATE
export async function PATCH(req, { params }) {
  try {
    await connectDB();
    const { user, error } = verifyJWT(req);
    if (error) return Response.json({ message: "Unauthorized" }, { status: 401 });

    const { name, content, category } = await req.json();
    const updated = await Template.findOneAndUpdate(
      { _id: params.id, user: user.userId },
      { name, content, category },
      { new: true }
    );

    if (!updated) return Response.json({ message: "Template not found" }, { status: 404 });

    return Response.json({ message: "Template updated", template: updated });
  } catch (error) {
    return handleError(error, "UPDATE_TEMPLATE");
  }
}

// DELETE TEMPLATE
export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { user, error } = verifyJWT(req);
    if (error) return Response.json({ message: "Unauthorized" }, { status: 401 });

    const deleted = await Template.findOneAndDelete({ _id: params.id, user: user.userId });
    if (!deleted) return Response.json({ message: "Template not found" }, { status: 404 });

    return Response.json({ message: "Template deleted" });
  } catch (error) {
    return handleError(error, "DELETE_TEMPLATE");
  }
}