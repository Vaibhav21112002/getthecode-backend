const jwt = require("jsonwebtoken");
const { getUser } = require("../controllers/auth-ctrl.js");
const axios = require("axios");

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  // baseURL: "https://getthecode-backend.onrender.com/api",
});

require("dotenv").config();

const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified.user_data;
    const data = await api.post('/auth/getUser',req.user);
    console.log(data.data)
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Invalid Token",
    });
  }
};

module.exports = fetchUser;
