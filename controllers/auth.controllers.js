import User from "../models/user.model.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({
      username,
      email,
      password,
    });
    await newUser.save();
    res.status(201).json({ data: newUser });
  } catch (error) {
    res.status(500).json({ error: error.massage });
  }
};
