import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// jwt
// token => { header({alg, HS265}, type(jwt)). payload .alg(secret key)}
// role = admin
// payload => {id, role}
export const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    // const userResponse = newUser.toObject();
    // delete userResponse.password, userResponse.createdAt;
    res.status(201).json({
      data: {
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.massage });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    // true / false
    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      return res.status(400).json({ data: "password is wrong" });
    }
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.SECRET_KEY,
      {
        expiresIn: "3h",
      }
    );
    user.token = token;
    await user.save();
    return res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ error: error.massage });
  }
};

// get me
export const getMe = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded.role;
    console.log(req.user);
    const user = await User.findById(decoded.userId);
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ error: error.massage });
  }
};
