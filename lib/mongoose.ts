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
        serverSelectionTimeoutMS: 10000,
      })
      .then((result) => {
        logger.info("Connected to MongoDB");
        return result;
      })
      .catch((error) => {
        // Clear cached state so a later request can retry after infra/env fixes.
        cached.promise = null;
        cached.conn = null;

        const message = error instanceof Error ? error.message : String(error);
        logger.error({ err: error }, "Error connecting to MongoDB");

        if (
          message.includes("Could not connect to any servers") ||
          message.includes("ReplicaSetNoPrimary") ||
          message.toLowerCase().includes("whitelist")
        ) {
          throw new Error(
            "MongoDB connection failed. If you use Atlas, add your current IP to Network Access allowlist and verify MONGODB_URI credentials."
          );
        }

        throw error;
      });
  }

  cached.conn = await cached.promise;

  return cached.conn;
};

export default dbConnect;
