const sql = require("mssql");

const config = {
  user: "sa",
  password: "Test1234!",
  server: "localhost\\SQLEXPRESS",
  database: "TestDB",
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};

module.exports = { sql, config };
