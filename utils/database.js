import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("MongoDB is connected!");
    return;
  }

  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("DB connection successful!");
  } catch (error) {
    console.log(error);
  }
};
