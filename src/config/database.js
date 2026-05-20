const mysql = require('mysql2');
require('dotenv').config();

// Create connection pool using DB_URL
const pool = mysql.createPool(process.env.DB_URL);

module.exports = pool.promise();