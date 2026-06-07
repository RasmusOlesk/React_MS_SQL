const sql = require("mssql");

const config = {
  user: "sa",
  password: "Rasmus",
  server: "localhost",
  port: 1433,
  database: "TestDB",
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

module.exports = { sql, config };
