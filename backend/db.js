// backend/db.js
const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Sesuaikan dengan username MySQL Anda
  password: '', // Sesuaikan dengan password MySQL Anda
  database: 'angular_v1' // Nama database MySQL
});

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL');
});

module.exports = db;