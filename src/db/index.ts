import mongoose from "mongoose";
import { MONGO_URL } from "../config";

export const connectDb = async (uri: string): Promise<void> => {
  mongoose
    .connect(uri)
    .then(() => {
      console.log("connected to database");
    })
    .catch((error) => {
      console.log("failed to connect to database");
    });
};
