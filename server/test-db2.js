import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "config", "config.env") });

async function check() {
  await mongoose.connect(process.env.MONGO_URI, { dbName: "MERN_STACK_LIBRARY_MANAGEMENT_SYSTEM" });
  const verifiedUsers = await mongoose.connection.db.collection("users").find({ accountVerified: true }).toArray();
  console.log("Verified users:", verifiedUsers.map(u => ({ email: u.email, role: u.role })));
  process.exit(0);
}
check();
