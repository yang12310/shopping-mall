import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      zipCode, 
      address,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: passwordHash,
      phone,
      zipCode,
      address,
    });
    
    const existUser = await User.find({email:email})
    
    if (existUser.length) {
      res.status(204).json();
      return
    } 
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    //jwt.sign은 토큰을 만드는 함수 jwt_secret의 토큰을 가져와서 만드는 것
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password; 
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
