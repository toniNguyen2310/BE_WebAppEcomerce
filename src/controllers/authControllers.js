const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const keyAccessToken = process.env.JWT_ACCESS_KEY;
const keyRefreshToken = process.env.JWT_REFRESH_KEY;
const accessTokenExpire = process.env.JWT_ACCESS_EXPIRE_IN;
const refreshTokenExpire = process.env.JWT_REFRESH_EXPIRE_IN;
require("dotenv").config();

let refreshTokens = [];
const authController = {
  //REGISTER
  registerUser: async (req, res) => {
    try {
      //bcrypt
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      //Create new user
      const newUser = await new User({
        email: req.body.email,
        username: req.body.username,
        password: hashed,
        phone: req.body.phone,
      });

      //Save to DB
      const user = await newUser.save();
      res.status(200).json({
        EC: 0,
        data: user,
      });
    } catch (error) {
      console.log("errer register>> ", error);
      res.status(500).json({
        EC: -2,
        data: error,
      });
    }
  },

  //GENERATE ACCESS TOKEN
  generateAccessToken: (user) => {
    return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, keyAccessToken, {
      expiresIn: accessTokenExpire,
    });
  },

  //GENERATE REFRESH TOKEN
  generateRefreshToken: (user) => {
    return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, keyRefreshToken, {
      expiresIn: refreshTokenExpire,
    });
  },

  // LOGIN
  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });

      //Kiểm tra xác thực email
      if (!user) {
        return res.status(404).json({
          EC: -1,
          data: "Thông tin đăng nhập không đúng",
        });
      }

      //Kiểm tra xác thực pasword
      const validatePassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!validatePassword) {
        return res.status(404).json({
          EC: -1,
          data: "Thông tin đăng nhập không đúng",
        });
      }

      //Trùng email và password
      if (user && validatePassword) {
        const accessToken = authController.generateAccessToken(user);
        const refreshToken = authController.generateRefreshToken(user);

        refreshTokens.push(refreshToken);
        console.log("refreshTokens Login>>> ", refreshTokens);
        //Lưu Refresh Token vào cookies
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });

        //Loaị bỏ password khi login
        const { password, ...others } = user._doc;

        const userWP = { ...others };
        res.status(200).json({
          EC: 0,
          data: { userWP, accessToken, refreshToken },
        });
      }
    } catch (error) {
      res.status(500).json({
        EC: -2,
        data: error,
      });
    }
  },

  //REQUEST REFRESH TOKEN
  requestRefreshToken: async (req, res) => {
    //take refresh token from user
    if (!req.headers.cookie) {
      return;
    }
    const refreshToken = req.headers.cookie.split("=")[1];

    if (!refreshToken) {
      // return res.status(403).json({ EC: -2, data: "Không có refresh token" });
      return res.status(401).json({ EC: -2, data: "Không có refresh token" });
    }
    // refreshTokens.push(refreshToken);
    console.log("refreshTokens >>> ", refreshTokens);

    jwt.verify(refreshToken, keyRefreshToken, (err, user) => {
      console.log("user refresh token>>> ", user);
      if (err) {
        console.log("Có lỗi refresh token khi verify>>>> ", err);
        res.clearCookie("refreshToken");
        return res.status(400).json({ EC: -2, data: "Refresh Token hết hạn" });
      }
      console.log("refreshToken when refresh>>> ", refreshTokens);
      //Kiểm tra trùng lặp refresh token trong kho
      // if (!refreshTokens.includes(refreshToken)) {
      //   console.log("run incluce refresh");
      //   return res
      //     .status(400)
      //     .json({ EC: -2, data: "Refresh Token is not valid" });
      // }
      //Lọc refresh token cũ ra khỏi db
      refreshTokens = refreshTokens.filter((token) => token != refreshToken);
      console.log("refreshToken after push>>> ", refreshTokens);
      //Create new access token and refresh token
      const newAccessToken = authController.generateAccessToken(user);
      const newRefreshToken = authController.generateRefreshToken(user);

      //Thêm token mới vào db
      refreshTokens.push(newRefreshToken);
      console.log("refreshToken after refresh>>> ", refreshTokens);

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });

      res.status(200).json({
        EC: 0,
        data: {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        },
      });
    });
  },

  //LOGOUT
  logoutUser: async (req, res) => {
    refreshTokens = refreshTokens.filter(
      (token) => token !== req.headers.cookie.split("=")[1]
    );
    res.clearCookie("refreshToken");
    return res.status(200).json({
      EC: 0,
      data: { EC: 0, data: "Logout successfully" },
    });
  },

  //FETCH ACCOUNT
  fetchAccount: async (req, res) => {
    try {
      const userFullInfor = await User.findById(req.user.id);
      const { password, ...others } = userFullInfor._doc;
      const user = { ...others };
      res.status(200).json({
        EC: 0,
        data: { user },
      });
    } catch (error) {
      res.status(500).json({
        EC: -2,
        data: error,
      });
    }
  },
};

module.exports = authController;
