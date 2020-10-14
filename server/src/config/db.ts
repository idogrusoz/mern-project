import mongoose from "mongoose";

export const connectDb = async (): Promise<void> => {
    const conn = await mongoose.connect(process.env.MONGODB_URI!, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
};

export default mongoose;
