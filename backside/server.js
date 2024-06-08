require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRouter = require('./routers/authRouter');

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Routers
app.use('/api', authRouter);

const port = process.env.PORT || 5008; // Đảm bảo chọn cổng mới, chưa sử dụng
const URL = process.env.MONGO_URI;

// Kết nối đến MongoDB sử dụng async/await
const connectDB = async () => {
  try {
    await mongoose.connect(URL);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
    process.exit(1); // Dừng ứng dụng nếu không kết nối được
  }
};

connectDB();

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
