import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
async function connect() {
    const db = await mongoose.connect(process.env.MONGO);
    console.log('Connected to MongoDB ');
    return db;
  }

  export default connect;