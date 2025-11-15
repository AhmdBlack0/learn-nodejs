import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ahmdblack0_db_user:vTPz3g8DlKuDSU4D@cluster0.bdqztbp.mongodb.net/?appName=Cluster0"
    );
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

export default connectDB;
