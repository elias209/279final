// server.js

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const flash = require("express-flash");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");
const profileRoute = require("./routes/profileRoute");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(flash());
app.use(cookieParser());

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 24 * 60 * 60,
    },
  })
);

app.use("/profile", profileRoute);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
