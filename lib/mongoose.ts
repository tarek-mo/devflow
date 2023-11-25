import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDB = async () => {
  // the strict option, ensures that values passed to our model constructor that were not specified in our schema do not get saved to the db
  mongoose.set("strictQuery", true);
  if (!process.env.MONGODB_URL) return console.log("MISSING MONGODB_URL");

  if (isConnected) return console.log("MONGODB already connected");

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "DevFlow",
    });
    isConnected = true;
    console.log("MongoDB is connected!");
  } catch (error) {
    console.log("Error connection", error);
  }
};
