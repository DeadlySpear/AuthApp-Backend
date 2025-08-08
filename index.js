const express = require('express');
const app = express();
require ('dotenv').config();
require('./models/db.js');
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require('./routes/authRouter.js');

app.use(bodyParser.json());

// CORS configuration for production
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = process.env.NODE_ENV === 'production' 
      ? [
          process.env.FRONTEND_URL,
          'https://auth-app-frontend-sage.vercel.app/',
          'https://auth-app-frontend-sage.vercel.app/'
        ]
      : ['http://localhost:3000'];
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

app.get('/test', (req, res) => {
  res.send('test success')
})

app.use('/auth', authRouter);     
app.use('/products', require('./routes/productRouter.js'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);
  
  // Handle CORS errors
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ 
      message: 'CORS error: Origin not allowed',
      error: process.env.NODE_ENV === 'development' ? err.message : 'Forbidden'
    });
  }
  
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})