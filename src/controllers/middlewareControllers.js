const jwt = require("jsonwebtoken");
require("dotenv").config();
const keyAccessToken = process.env.JWT_ACCESS_KEY;

const middlewareControllers = {
  // Verify token
  verifyToken: (req, res, next) => {
    const token = req.headers["authorization"];
    if (token) {
      //bearer 1235664 =>accesstoken = 123456
      const accessToken = token.split(" ")[1];
      //tạo token dùng sign, xác thực dùng verify
      jwt.verify(accessToken, keyAccessToken, (err, user) => {
        if (err) {
          res
            .status(401)
            .json({
              EC: -2,
              data: "Token đã hết hạn cần Refresh Token hoặc = null",
            });
          return;
        }
        req.user = user;
        console.log("user>>> ", user);
        next();
      });
    } else {
      res.status(401).json({ EC: -2, data: "Không thấy có Token" });
      return;
    }
  },

  //Xác thực admin để xóa user
  verifyTokenAndAdminAuth: (req, res, next) => {
    middlewareControllers.verifyToken(req, res, () => {
      //if => xác nhận id chính chủ hoặc admin thì tiếp tục công việc tiếp theo
      if (req.user.id == req.params.id || req.user.isAdmin) {
        next();
      } else {
        res
          .status(403)
          .json({ EC: -2, data: "You are not allowed to delete other" });
      }
    });
  },
};

module.exports = middlewareControllers;
