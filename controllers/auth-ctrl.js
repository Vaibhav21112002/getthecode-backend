const User = require("../models/user");
const Admin = require("../models/admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const JWT_SECRET = "thisismysecretkey";

module.exports.register = async (req, res) => {
  const { name, email, password, number } = req.body;
  const user = await User.findOne({ email: email });
  if (!name || !email || !password || !number) {
    return res.status(200).json({
      message: "Please enter all fields",
      status: false,
    });
  }
  if (user) {
    return res.status(200).json({
      message: "User already exists",
      status: false,
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  try {
    const newUser = new User({
      name,
      password: hash,
      number,
      email,
    });
    const user = await newUser.save();
    const data = {
      user_data: {
        id: user._id,
        role: user.role,
        date: user.date,
        name: user.name,
      },
    };
    const newData = await User.findById(user._id).select("-password");
    const token = jwt.sign(data, JWT_SECRET, { expiresIn: "1h" });
    return res.status(201).json({
      message: "User created successfully",
      newData,
      token,
      status: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error creating user",
      error: err,
      status: false,
    });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  const data = await User.findOne({ email: email }).select("-password");
  try {
    if (!email || !password) {
      return res.status(200).json({
        message: "Please enter all fields",
        status: false,
      });
    }

    if (!user) {
      return res.status(200).json({
        message: "User does not exist",
        status: false,
      });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(200).json({
        message: "Incorrect password",
        status: false,
      });
    }

    const data = {
      user_data: {
        id: user._id,
        role: user.role,
        date: user.date,
        name: user.name,
      },
    };
    const token = jwt.sign(data, JWT_SECRET, { expiresIn: "1h" });
    return res.status(200).json({
      message: "User logged in successfully",
      data,
      token,
      status: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error logging in",
      error: err,
      status: false,
    });
  }
};

module.exports.getUser = async (req, res) => {
  const userId = req.body.id;
  console.log(userId);

  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "No such user exixsts.",
        status: false,
      });
    }
    return res.status(200).json({
      message: "User fetched successfully",
      user,
      status: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error logging in",
      error: error,
      status: false,
    });
  }
};

module.exports.sendOtp = async (req, res) => {
  const { email } = req.body;
  console.log(req.body);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const otp = Math.floor(1000 + Math.random() * 9000);

    const token = jwt.sign({ email, otp }, JWT_SECRET, {
      expiresIn: "10m",
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "graminfreelancer@gmail.com",
        pass: "gsqugqglavnegkkf",
      },
    });

    const mailOptions = {
      from: "graminfreelancer@gmail.com",
      to: email,
      subject: "OTP Verification",
      html: `<p>Dear user,</p><p>Your OTP is ${otp}. Please use this OTP to reset your password.</p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res
          .status(500)
          .json({ msg: "Failed to send OTP. Please try again later." });
      } else {
        console.log("Email sent: " + info.response);
        return res.status(200).json(token);
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports.verifyOtp = async (req, res) => {
  const { token, otp } = req.body;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { email } = decoded;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (otp !== decoded.otp) {
      return res.status(400).json({ msg: "Invalid OTP" });
    }

    res.status(200).json({ msg: "OTP verified successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports.changePassword = async (req, res) => {
  const { password, email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
    await user.save();
    return res.status(200).json({ msg: "Password updated successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Error changing password.",
      error: error,
      status: false,
    });
  }
};

module.exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email: email });
  const loginData = await Admin.findOne({ email: email }).select("-password");

  try {
    if (!email || !password) {
      return res.status(200).json({
        message: "Please enter all fields",
        status: false,
      });
    }

    if (!admin) {
      return res.status(200).json({
        message: "User does not exist",
        status: false,
      });
    }

    const passwordCompare = await bcrypt.compare(password, admin.password);
    if (!passwordCompare) {
      return res.status(200).json({
        message: "Incorrect password",
        status: false,
      });
    }
    const data = {
      user_data: {
        id: admin._id,
        role: admin.role,
        date: admin.date,
        name: admin.name,
      },
    };
    const token = jwt.sign(data, JWT_SECRET, { expiresIn: "1h" });
    return res.status(200).json({
      message: "User logged in successfully",
      loginData,
      token,
      status: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error logging in",
      error: err,
      status: false,
    });
  }
};

module.exports.getAdmin = async (req, res) => {
  const adminId = req.body.id;

  try {
    const admin = await Admin.findById(adminId).select("-password");
    if (!admin) {
      return res.status(404).json({
        message: "No such user exixsts.",
        status: false,
      });
    }
    return res.status(200).json({
      message: "User fetched successfully",
      admin,
      status: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error logging in",
      error: error,
      status: false,
    });
  }
};

module.exports.getAdminData = async (req, res) => {
  const token = req.body.token;

  try {
    const verified = jwt.verify(token,JWT_SECRET);
    const data = verified.user_data;
    console.log(verified);
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const userData = decodedToken.user_data;
    console.log(userData.id); // logs the user's ID
    console.log(userData.role); // logs the user's role
    console.log(userData.date); // logs the user's date
    console.log(userData.name); // logs the user's name

    return res.status(200).json({ data: data });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
