import mongoose from "mongoose";
const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
  }
  mongoose.connection.once("open", () => {
  console.log("====================================");
  console.log("MONGO DATABASE:", mongoose.connection.name);
  console.log("MONGO HOST:", mongoose.connection.host);
  console.log("====================================");
});
};

export default connectDB;