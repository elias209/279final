const connection = require("../db/_database.config.js");

const login = (req, res) => {
  const sql =
    "SELECT * FROM user WHERE user_Username = ? AND user_Password = ?";

  connection.query(sql, [req.body.name, req.body.password], (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Login Failed", error: err });
    }
    if (data.length > 0) {
      req.session.username = data[0].user_Username;
      console.log(data);
      console.log(req.session.username);
      return res.json({ Login: true, username: req.session.username });
    } else {
      return res.status(401).json({ message: "No user found" });
    }
  });
};

module.exports = { login };
