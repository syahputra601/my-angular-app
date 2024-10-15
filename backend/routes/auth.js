// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  
  // Hash password
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;
    
    // Simpan user ke database
    const query = `INSERT INTO users (username, password) VALUES (?, ?)`;
    db.query(query, [username, hash], (err, result) => {
      if (err) throw err;
      res.json({ success: true, message: 'User registered successfully' });
    });
  });
});

// Login User
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Cek apakah user ada di database
  const query = `SELECT * FROM users WHERE username = ?`;
  db.query(query, [username], (err, result) => {
    if (err) throw err;
    if (result.length === 0) return res.status(401).json({ message: 'User not found' });

    // Cek password dengan bcrypt
    // bcrypt.compare(password, result[0].password, (err, isMatch) => {
    //   if (err) throw err;
    //   if (!isMatch) return res.status(401).json({ message: 'Incorrect password' });

    //   // Generate JWT token
    //   const token = jwt.sign({ id: result[0].id }, 'secretkey', { expiresIn: '1h' });
    //   res.json({ success: true, token });
    // });

    // Ambil password yang tersimpan di database
    const dbPassword = result[0].password;

    // Membandingkan password secara langsung (Plaintext, sangat tidak disarankan)
    if (password === dbPassword) {
      // Jika password cocok, buat token JWT
      const token = jwt.sign({ id: result[0].id }, 'secretkey', { expiresIn: '1h' });
      return res.json({ success: true, token });
    } else {
      // Jika password tidak cocok
      return res.status(401).json({ message: 'Incorrect password' });
    }
    

  });
});

module.exports = router;
