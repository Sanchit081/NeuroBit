const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
let PORT = parseInt(process.env.PORT) || 5000;
const MAX_PORT = 5010;

// Import routes
const subscribeRoutes = require('./routes/subscribe');
const productsRoutes = require('./routes/products');
const adminRoutes = require('./routes/admin');
const feedbackRoutes = require('./routes/feedback');

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB Atlas');
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'NeuroBit API is running',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/subscribe', subscribeRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/feedback', feedbackRoutes);

// Error middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Try binding to a free port between PORT and MAX_PORT
function tryStartServer(port) {
  const server = app.listen(port, () => {
    console.log(`🚀 NeuroBit Backend running on port ${port}`);
    console.log(`📊 Health check: http://localhost:${port}/api/health`);
    console.log(`🔗 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`⚠️ Port ${port} in use. Trying ${port + 1}...`);
      if (port < MAX_PORT) {
        tryStartServer(port + 1);
      } else {
        console.error('❌ No available ports found between 5000–5010.');
      }
    } else {
      console.error('❌ Server failed to start:', err);
    }
  });
}

tryStartServer(PORT);

module.exports = app;
