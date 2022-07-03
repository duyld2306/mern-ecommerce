const express = require("express");
const cors = require("cors");
var morgan = require("morgan");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();
const db = require("./config/db");
const userRouter = require("./routes/user.route");

const app = express();

db.connect();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(morgan("common"));
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

//Routes
app.use("/user", userRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
