import mongoose from "mongoose";

import app from "./app.js";
import connectDatabase from "./config/database.js";

const PORT = process.env.PORT || 5000;

let server;

/**
 * Starts the HTTP server after connecting to MongoDB.
 */

async function startServer() {
    await connectDatabase();

    server = app.listen(PORT, () => {
        console.log(
            `MovieVerse API running in ${process.env.NODE_ENV} mode on port ${PORT}.`,
        );
    });
}

/**
 * Closes the HTTP server and MongoDB connection safely.
 */

async function shutdownServer(signal) {
    console.log(`${signal} received. Shutting down...`);

    if (!server) {
        await mongoose.connection.close();
        process.exit(0);
    }

    server.close(async () => {
        await mongoose.connection.close();

        console.log("HTTP server and MongoDB connection closed.");

        process.exit(0);
    });
}

process.on("SIGINT", () => shutdownServer("SIGINT"));
process.on("SIGTERM", () => shutdownServer("SIGTERM"));

if (!process.env.TMDB_API_KEY) {
    console.error("TMDB_API_KEY is missing.");
    process.exit(1);
}

startServer().catch((error) => {
    console.error(`Server startup failed: ${error.message}`);
    process.exit(1);
});

console.log("TMDb API:", process.env.TMDB_API_KEY ? "Loaded" : "Missing");
