const express = require('express');
const router = express.Router();
const Users = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Hàm tạo access token
const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESSTOKENSECRET, { expiresIn: "1d" });
};

// Hàm tạo refresh token
const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESHTOKENSECRET, { expiresIn: "30d" });
};

// Phương thức đăng ký tài khoản
const register = async (req, res) => {
  try {
    const { fullname, username, email, password, gender } = req.body;

    // Kiểm tra email hoặc username đã tồn tại chưa
    const user = await Users.findOne({ email });
    if (user) return res.status(400).json({ msg: "This email already exists." });

    const usernameCheck = await Users.findOne({ username });
    if (usernameCheck) return res.status(400).json({ msg: "This username already exists." });

    // Mã hóa mật khẩu
    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = new Users({
      fullname, username, email, password: passwordHash, gender
    });

    // Lưu người dùng mới vào database
    await newUser.save();

    // Tạo token
    const accessToken = createAccessToken({ id: newUser._id });
    const refreshToken = createRefreshToken({ id: newUser._id });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      path: '/api/refresh_token',
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });

    res.json({
      msg: 'Register successful!',
      accessToken,
      user: {
        ...newUser._doc,
        password: ''
      }
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

// Phương thức đăng nhập
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });
    if (!user) return res.status(400).json({ msg: "This email does not exist." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Password is incorrect." });

    // Tạo token
    const accessToken = createAccessToken({ id: user._id });
    const refreshToken = createRefreshToken({ id: user._id });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      path: '/api/refresh_token',
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });

    res.json({
      msg: 'Login successful!',
      accessToken,
      user: {
        ...user._doc,
        password: ''
      }
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

// Phương thức đăng xuất
const logout = async (req, res) => {
  try {
    res.clearCookie('refreshToken', { path: '/api/refresh_token' });
    return res.json({ msg: "Logged out!" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

// Phương thức tạo lại token
const refreshToken = async (req, res) => {
  try {
    const rf_token = req.cookies.refreshToken;
    if (!rf_token) return res.status(400).json({ msg: "Please login now!" });

    jwt.verify(rf_token, process.env.REFRESHTOKENSECRET, (err, user) => {
      if (err) return res.status(400).json({ msg: "Please login now!" });

      const accessToken = createAccessToken({ id: user.id });

      res.json({ accessToken });
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

// Phương thức lấy thông tin người dùng
const getUser = async (req, res) => {
  try {
    // Lấy thông tin người dùng từ req hoặc database
    // Ví dụ: const user = await Users.findById(req.userId);
    // Sau đó trả về thông tin người dùng dưới dạng JSON
    res.json({
      username: "example_user",
      email: "example@example.com",
      fullname: "Example User"
      // Thêm thông tin khác của người dùng tại đây...
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  register,
  login,
  logout,
  refreshToken,
  getUser
};
