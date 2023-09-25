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

// Config
// app.use(
//   cors({
//     // credentials: true,
//     origin: "https://lacdau-clone-fe-pj.vercel.app",
//     // origin: "http://localhost:5174",
//     optionSuccessStatus: 200,
//   })
// );

app.use(function (req, res, next) {
  const allowedOrgini = ["https://lacdau-clone-fe-pj.vercel.app"];
  const origin = req.headers.origin;
  if (allowedOrgini.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  // if (req.method === "OPTIONS") {
  //   return res.sendStatus(200);
  // }
  // Pass to next layer of middleware
  next();
});

// Add headers before the routes are defined
// app.use(app.use(function (req, res, next) {
//   console.log("req.method>> ", req.method, req.headers);
//   // Website you wish to allow to connect
//   res.setHeader("Access-Control-Allow-Origin", "*");

//   // Request methods you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );

//   // Request headers you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,content-type, Authorization"
//   );

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   // res.setHeader("Access-Control-Allow-Credentials", true);

//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }
//   // Pass to next layer of middleware
//   next();
// });

// app.use((req, res, next) => {
//   res.header(
//     "Access-Control-Allow-Origin",
//     "https://lacdau-clone-fe-pj.vercel.app,"
//   );
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
