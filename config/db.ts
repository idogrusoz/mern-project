import mongoose from "mongoose";

export const connectDb = async (): Promise<void> => {
    const conn = await mongoose.connect(getConnectionUri(), {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
};

const getConnectionUri = (): string => {
    return process.env.NODE_ENV === "test"
        ? (process.env.MONGODB_TEST_URI as string)
        : (process.env.MONGODB_URI as string);
};

export default mongoose;
