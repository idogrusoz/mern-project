import express, { json } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { Server } from "http";
import { connectDb } from "./config/db";
import routes from "./routes";

dotenv.config();
export const app = express();
connectDb();

app.use(json());
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
        exposedHeaders: ["set-cookie"],
    }),
);

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

const PORT = process.env.PORT;

app.set("addPath", "client/build");
app.use(express.static("client/build"));

app.use("/", routes);

export const server: Server = app.listen(PORT, () =>
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`),
);

process.on("unhandledRejection", (err: Error, promise: Promise<any>) => {
    console.log(`Error: ${err}`);
    server.close(() => process.exit(1));
});
