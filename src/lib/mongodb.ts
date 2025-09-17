// lib/mongodb.ts
import mongoose from "mongoose";

const mongoUrl = process.env.MONGO_URI as string;

if (!mongoUrl) {
  throw new Error("Please define the MONGO_URI environment variable inside .env");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectToMongo() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(mongoUrl)
      .then((mongoose) => {
        console.log("MongoDB connected ✅");
        return mongoose;
      })
      .catch((err) => {
        console.error("MongoDB connection error ❌", err);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  (global as any).mongoose=cached
  return cached.conn;
}

export default connectToMongo;

