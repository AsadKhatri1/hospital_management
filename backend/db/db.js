import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "HOSPITAL_MANAGEMENT_SYSTEM",
    })
    .then(() => {
      console.log("DB connected succesfully");
    })
    .catch((err) => {
      console.log("Error while connecting to database ", err);
    });
};
