import { connect, set } from "mongoose";
import { validateEnv } from "./env.config";

const MONGO_DB_URI = validateEnv().MONGO_DB_URI;

//*Connection to DB
export const connectToDb = async () => {
  try {
    set("strictQuery", false);
    const db = await connect(MONGO_DB_URI);
    console.log("MongoDB connected successfully", db.connection.name);
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
