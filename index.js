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
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL, 'https://auth-app-frontend-sage.vercel.app/'] // Replace with your actual Vercel domain
    : ['http://localhost:3000'],
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
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})