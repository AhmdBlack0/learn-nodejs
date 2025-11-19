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
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    // const userResponse = newUser.toObject();
    // delete userResponse.password, userResponse.createdAt;
    res.status(201).json({
      data: {
        username: newUser.username,
        email: newUser.email,
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
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "3h",
    });
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
    const decoded = await jwt.verify(
      token,
      "7ecd6956bd56a3e7ddb0dc3f8a1dcb77dca0285465a859c523d63be6c4e16665"
    );
    const user = await User.findById(decoded.userId);
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ error: error.massage });
  }
};
