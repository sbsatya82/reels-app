import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if(!MONGODB_URI){
  throw new Error('Missing MONGODB_URI environment variable');
}

let cached = global.mongoose || { conn: null, promise: null };


async function connectDB() {
  if (cached.conn) return cached.conn; // Return existing connection if available

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI)
      .then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

// Cache connection globally to prevent multiple connections in Next.js
global.mongoose = cached;

export default connectDB;