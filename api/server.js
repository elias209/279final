const express = require("express");
const cors = require("cors");
const session = require("express-session");
const flash = require("express-flash");
const dotenv = require("dotenv");

const cookieParser = require("cookie-parser");

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

const loginRoute = require("./routes/loginRoute");
const signupRoute = require("./routes/signupRoute");

app.use("/login", loginRoute);
app.use("/signup", signupRoute);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
