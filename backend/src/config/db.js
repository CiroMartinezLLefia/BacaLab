import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("MongoDB conectado!");
  } catch (err) {
    console.log("Error al conectar el mongoDB: ", err.message);
  }
};

export default connectDB;