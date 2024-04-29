import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import ApplicationError from "../errorHandling/customError.error.js";

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to mongoDb ");
  } catch (err) {
    console.log(err);
    throw new ApplicationError(err, 500);
  }
};
export default connectToDB;
