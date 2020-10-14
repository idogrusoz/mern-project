import express from "express";
import dotenv from "dotenv";
import { Server } from "http";

dotenv.config();
const app = express();

const PORT = process.env.PORT;

const server: Server = app.listen(PORT, () =>
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`),
);

process.on("unhandledRejection", (err: Error, promise: Promise<any>) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});
