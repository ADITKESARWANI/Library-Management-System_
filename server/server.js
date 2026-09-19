import { app } from "./app.js";
import { v2 as cloudinary } from "cloudinary";
import { connectDB } from "./database/db.js";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

await connectDB();

app.listen(process.env.PORT || 5000, () => {
    console.log(`👍 Server is running on port ${process.env.PORT || 5000}`);
});
