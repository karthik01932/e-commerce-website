const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    datebase: 'node-complete',
    password: 'K8321@art#'
});

module.exports = pool.promise();