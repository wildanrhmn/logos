import mongoose from "mongoose";
import { env } from "./env";

export async function dbConnect() {
  try {
    let conn = await mongoose.connect(String(env.MONGO_URI));
    return conn;
  } catch (e: any) {
    throw new Error(e);
  }
}