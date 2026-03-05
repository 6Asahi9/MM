const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.PG_URI,
  ssl: { rejectUnauthorized: false },
});

pool.on("connect", () => console.log("Connected to Neon Postgre"));

module.exports = pool;
