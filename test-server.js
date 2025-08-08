const express = require('express');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 8080;

// Basic CORS setup for testing
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Server is working correctly!' });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(port, () => {
  console.log(`Test server listening on port ${port}`);
  console.log(`Test the server at: http://localhost:${port}/test`);
  console.log(`Health check at: http://localhost:${port}/health`);
});
