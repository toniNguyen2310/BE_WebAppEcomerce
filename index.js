require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connection = require("./src/config/database");
const authRouter = require("./src/routes/auth");
const userRouter = require("./src/routes/user");
const cookieParser = require("cookie-parser");
const app = express();

//env

const port = process.env.PORT;
const hostname = process.env.HOST_NAME;

//Config
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3001",
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Khai báo routes khi vercel
app.get("/", (req, res) => {
  res.send("Hello, This is my Project");
});

//ROUTES
app.use("/v1/api/auth", authRouter);
app.use("/v1/api/user", userRouter);

//Connect to DB
(async () => {
  try {
    await connection();
    app.listen(port, hostname, () => {
      console.log(`backend zero app listening on port ${port}`);
    });
  } catch (error) {
    console.log("error connect to DB>>> ", error);
  }
})();
