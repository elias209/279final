const mysql2 = require("mysql2");
const config = require("./config.js");

const connection = mysql2.createConnection({
  host: config.config.HOST,
  port: config.config.PORT,
  user: config.config.USER,
  password: config.config.PASSWORD,
  database: config.config.DB,
  multipleStatements: config.config.multipleStatements,
  dateStrings: true,
  typeCast: function castField(field, useDefaultTypeCasting) {
    if (field.type === "BIT" && field.length === 1) {
      var bytes = field.buffer();

      return bytes[0] === 1;
    }

    return useDefaultTypeCasting();
  },
});

function handleDisconnect() {
  connection.connect((error) => {
    if (error) {
      console.log(error);
      setTimeout(handleDisconnect, 3000);
    } else {
      console.log(
        "==========================================================="
      );
      console.log(">>> Successfully connected to the database");
      console.log(
        "==========================================================="
      );
    }
  });

  connection.on("error", function (err) {
    console.log(err);
    if (err.code == "PROTOCOL_CONNECTION_LOST" || err.code == "ECONNRESET") {
      console.log("DATABASE CONNECTION LOST");
      handleDisconnect();
    } else {
      handleDisconnect();
      throw err;
    }
  });
}

handleDisconnect();

module.exports = connection;
