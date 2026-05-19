const mysql = require('mysql2');
require('dotenv').config();

// Use DB_URL from environment variables (Aiven cloud MySQL)
const pool = mysql.createPool(process.env.DB_URL);

module.exports = pool.promise();