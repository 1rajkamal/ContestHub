const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const competitionRoutes = require('./routes/competitionRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Enable CORS for mobile and web frontends
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Feedants Competition API',
    version: '1.0.0',
  });
});

// Main API routes
app.use('/api/competitions', competitionRoutes);

// Catch-all 404 for undefined routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    error: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Centralized error handling middleware
app.use(errorHandler);

module.exports = app;
