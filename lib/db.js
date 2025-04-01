import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error("⚠️ Please define the MONGODB_URI in your .env.local file");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  // Kung connected na, gamitin na lang 'yan
  if (cached.conn) return cached.conn;

  // Kung wala pang ongoing connection, connect now
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URL, {
      autoIndex: true,
    });
  }

  // Hintayin matapos ang promise, then save to conn
  cached.conn = await cached.promise;
  return cached.conn;
}
