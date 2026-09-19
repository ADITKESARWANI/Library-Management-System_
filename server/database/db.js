import mongoose from "mongoose";

export const connectDB = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is missing. Check server/config/config.env");
    }

    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            dbName: "MERN_STACK_LIBRARY_MANAGEMENT_SYSTEM"
        });

        console.log(`Database connected successfully👍: ${connection.connection.host}`);
    } catch (err) {
        console.error("Error connecting to database👺:", err.message);
        throw err;
    }
};
