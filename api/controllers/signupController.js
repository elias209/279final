// controllers/signupController.js
const connection = require("../db/_database.config.js");

const signup = (req, res) => {
  const sql =
    "INSERT INTO user (`user_Username`, `user_Age`, `user_Password`) VALUES  (?)";

  const values = [
    req.body.values.name,
    req.body.values.age,
    req.body.values.password,
  ];

  connection.query(sql, [values], (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Signup Failed", error: err });
    } else {
      return res.status(200).json({ success: true });
    }
  });
};

module.exports = { signup };
