export function handleError(error, context = "") {
    // 🛑 Ilog mo muna yung error sa console (para sa dev)
    console.error(`${context ? `[${context}] ` : ""}ERROR:`, error);
  
    // 📨 Return standardized error response
    return Response.json(
      {
        message: "Something went wrong.",
        stack: process.env.NODE_ENV === "production" ? null : error.stack,
      },
      { status: 500 }
    );
  }
  