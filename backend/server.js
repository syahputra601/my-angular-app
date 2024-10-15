// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/auth', authRoutes);

// Start server //3000
// const PORT = 3000;
const PORT = 4200;
// const PORT = '';
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
