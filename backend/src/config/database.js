import mongoose from "mongoose";

/**
 * Connects the application to MongoDB.
 */

async function connectDatabase() {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error(
                "MONGODB_URI is not defined in the environment variables.",
            );
        }

        const connection = await mongoose.connect(process.env.MONGODB_URI);

        console.log(`MongoDB connected: ${connection.connection.host}`);
    } catch (error) {
        console.error(`MongoDB connection failed: ${error.message}`);

        process.exit(1);
    }
}

export default connectDatabase;
