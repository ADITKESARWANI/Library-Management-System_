import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "config", "config.env") });

async function check() {
  await mongoose.connect(process.env.MONGO_URI, { dbName: "MERN_STACK_LIBRARY_MANAGEMENT_SYSTEM" });
  console.log("Connected");
  const users = await mongoose.connection.db.collection("users").find({}).toArray();
  console.log("Total users count:", users.length);
  const verifiedUsers = await mongoose.connection.db.collection("users").find({ accountVerified: true }).toArray();
  console.log("Verified users count:", verifiedUsers.length);
  if (users.length > 0) {
      console.log("First user:", users[0].email, users[0].accountVerified);
  }
  process.exit(0);
}
check();
