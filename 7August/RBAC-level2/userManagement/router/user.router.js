import express from "express";
const userRouter = express.Router();
import { UserModel } from "../model/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

userRouter.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(500).json({ message: "user already registered" });
    }
    if (!user) {
      bcrypt.hash(password, 3, async (err, hash) => {
        if (err) {
          return res.status(500).send("Error in hashing password");
        }
        if (hash) {
          const newUser = new UserModel({
            name,
            email,
            password: hash,
            role,
          });
          await newUser.save();
          return res
            .status(200)
            .json({ message: "user registerd successfully" });
        }
      });
    }
  } catch (error) {
    res.status(500).json({ message: "error in registering", error: error });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).send("user not found");
    }
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return res.status(400).json({ message: "incorrect password" });
        }
        if (result) {
          const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
          return res
            .status(200)
            .json({ message: "user logged successfully", token: token });
        } else {
          return res.status(400).json({ message: "incorrect password" });
        }
      });
    }
  } catch (error) {
    res.status(400).json({ message: "error in login ", error: error });
  }
});

export { userRouter };
