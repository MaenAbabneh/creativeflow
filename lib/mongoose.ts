import "@/database";

import mongoose, { Mongoose } from "mongoose";

import logger from "./logger";

interface Cached {
  startSession(): unknown;
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}
declare global {
  // eslint-disable-next-line no-var
  var mongoose: Cached;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let cached = (global as any).mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
    startSession: () => mongoose.startSession(),
  };
}

const dbConnect = async (): Promise<Mongoose> => {
  if (cached.conn) {
    logger.info("Using cached MongoDB connection");
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "CreativeOverflow",
      })
      .then((result) => {
        logger.info("Connected to MongoDB");
        return result;
      })
      .catch((error) => {
        logger.error("Error connecting to MongoDB", error);
        throw error;
      });
  }
  cached.conn = await cached.promise;

  return cached.conn;
};

export default dbConnect;
