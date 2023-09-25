require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connection = require("./src/config/database");
const authRouter = require("./src/routes/auth");
const userRouter = require("./src/routes/user");
const productRouter = require("./src/routes/products.routes");
const cookieParser = require("cookie-parser");
const categoryRouter = require("./src/routes/categoryRouter");
const app = express();

//env
const port = process.env.PORT;
const hostname = process.env.HOST_NAME;

// Enable CORS for all routes
app.use(cors());

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Khai báo routes khi vercel
app.get("/", (req, res) => {
  res.send({
    "req.method>": req.method,
    "req.headers>": req.headers,
  });
});

// ROUTES
app.use("/v1/api/auth/account", (req, res) => {
  res.send({
    "req.method>": req.method,
    "req.headers>": req.headers,
  });
});
app.use("/v1/api/user", userRouter);
app.use("/v1/api/product", productRouter);
app.use("/v1/api/category", categoryRouter);

// Connect to DB
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
