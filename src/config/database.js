const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
  port: 4000,
  user: '2Kou6gzZ7tnCrMF.root',
  password: 'ZXL36zgyu2SvIhG1',
  database: 'test',
  ssl: {
    rejectUnauthorized: true
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const promisePool = pool.promise();

module.exports = { pool, promisePool };