// backend/db.js
import { createConnection } from 'mysql';

const db = createConnection({
  host: 'localhost',
  user: 'root',  // Sesuaikan dengan user MySQL Anda
  password: '',  // Sesuaikan dengan password MySQL Anda
  database: 'angular_v1' // Nama database
});

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL');
});

export default db;
