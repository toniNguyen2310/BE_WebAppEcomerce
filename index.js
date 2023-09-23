require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connection = require("./src/config/database");
const authRouter = require("./src/routes/auth");
const userRouter = require("./src/routes/user");
const productRouter = require("./src/routes/products.routes");
const cookieParser = require("cookie-parser");
const categoryRouter = require("./src/routes/categoryRouter");
// const bookRouter = require("./src/routes/bookRouter");
const app = express();

//env

const port = process.env.PORT;
const hostname = process.env.HOST_NAME;

//Config
app.use(
  cors({
    credentials: true,
    origin: "https://lacdau-clone-fe-pj.vercel.app/",
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
app.use("/v1/api/product", productRouter);
app.use("/v1/api/category", categoryRouter);

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
