import { Types } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

import userModel from "../models/user.m.js";
import refreshTokensModel from "../models/refreshTokens.m.js";

// generate JWT_ACCESS_TOKEN
const generateAccessToken = (userId) => {
  return jwt.sign(
    {
      user_id: userId,
    },
    process.env.JWT_ACCESS_KEY,
    {
      expiresIn: process.env.EXPIRE_TIME_ACCESS_KEY,
    }
  );
};

// generate JWT_REFRESH_TOKEN
const generateRefreshToken = (userId) => {
  return jwt.sign(
    {
      user_id: userId,
    },
    process.env.JWT_REFRESH_KEY,
    { expiresIn: process.env.EXPIRE_TIME_REFRESH_KEY }
  );
};

const authController = {
  // [POST] /register
  register: async (req, res) => {
    try {
      // check if email/phone existed
      const user = await userModel.findOne({
        $or: [{ email: req.body.email }, { phone: req.body.phone }],
      });

      if (user !== null) {
        return res.status(409).json("Email/Phone already exists!");
      }

      // hash password
      const salt = await bcrypt.genSalt(11);
      const hashed = await bcrypt.hash(req.body.password, salt);

      // create a new user
      const infoUser = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: hashed,
      };

      // save user to database
      await userModel.create(infoUser);

      return res.status(200).json("Register successfully!");
    } catch (error) {
      console.log(error);

      res.status(500).json("500 Internal Server Error!");
    }
  },

  // [POST] /login
  login: async (req, res) => {
    try {
      // get user from database
      const user = await userModel.findOne({
        $or: [{ email: req.body.username }, { phone: req.body.username }],
      });

      if (user === null) {
        return res.status(404).json("404 Username doesn't exist!");
      }

      // check password
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) {
        return res.status(404).json("404 Wrong password!");
      } else {
        // create access and refresh tokens
        const accessToken = generateAccessToken(user._id.toString());
        const refreshToken = generateRefreshToken(user._id.toString());

        // add refresh token to list
        await refreshTokensModel.create({
          user_id: user._id.toString(),
          token: refreshToken,
        });

        return res.status(200).json({
          accessToken: accessToken,
          refreshToken: refreshToken,
        });
      }
    } catch (error) {
      console.log(error);

      res.status(500).json("500 Internal Server Error!");
    }
  },

  // [POST] /refresh
  requestNewRefreshToken: async (req, res) => {
    try {
      // take refresh token from user
      const refreshToken = req.body.refreshToken;

      if (!refreshToken) return res.status(401).json("401 Unauthorized!");

      // check if we have a refresh token but it isn't our list refresh tokens
      const token = await refreshTokensModel.findOne({ token: refreshToken });

      if (!token) {
        return res.status(403).json("403 Forbidden!");
      }

      // verify refresh token
      jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, async (error, userInfo) => {
        // if token has expired
        if (error) {
          console.log(error);

          return res.status(500).json("500 Internal Server Error!");
        }

        // if id not match
        if (token.user_id != userInfo.user_id) {
          return res.status(401).json("401 Unauthorized!");
        }

        // delete old refresh token
        await refreshTokensModel.deleteOne({ user_id: token.user_id });

        // create new access and refresh tokens
        const newAccessToken = generateAccessToken(token.user_id);
        const newRefreshToken = generateRefreshToken(token.user_id);

        // add new refresh token to list
        await refreshTokensModel.create({
          user_id: token.user_id,
          token: newRefreshToken,
        });

        res.status(200).json({
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        });
      });
    } catch (error) {
      console.log(error);

      res.status(500).json("500 Internal Server Error!");
    }
  },

  // [POST] /logout/:id
  logout: async (req, res) => {
    try {
      // delete refresh token from database
      const result = await refreshTokensModel.deleteOne({
        user_id: req.params.id,
        token: req.body.refreshToken,
      });

      if (result.deletedCount === 1) {
        res.status(200).json("Log out successfully!");
      } else {
        res.status(400).json("Log out unsuccessfully!");
      }
    } catch (error) {
      console.log(error);

      res.status(500).json("500 Internal Server Error!");
    }
  },
};

export default authController;
