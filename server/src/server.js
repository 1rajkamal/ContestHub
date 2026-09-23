require('dotenv').config();
const http = require('http');
const app = require('./app');
const { connectDB } = require('./config/db');
const Competition = require('./models/Competition');
const { seedData } = require('../scripts/seed');

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // 1. Initialize MongoDB (with auto in-memory fallback)
    await connectDB();

    // 2. Check if database has any competitions; if empty, auto-seed with reference data!
    const competitionCount = await Competition.countDocuments();
    if (competitionCount === 0) {
      console.log('[Server] Database is empty. Auto-seeding Feedants demo competition data...');
      await seedData();
    } else {
      console.log(`[Server] Found ${competitionCount} existing competition(s) in database.`);
    }

    // 3. Start HTTP server
    const server = http.createServer(app);
    server.listen(PORT, () => {
      console.log('====================================================');
      console.log(`🚀 Feedants Competition API Server is running!`);
      console.log(`📡 URL: http://localhost:${PORT}`);
      console.log(`🩺 Health: http://localhost:${PORT}/api/health`);
      console.log(`🏆 Competition API: http://localhost:${PORT}/api/competitions`);
      console.log('====================================================');
    });

    // Graceful shutdown handling
    const shutdown = async () => {
      console.log('\n[Server] Shutting down gracefully...');
      server.close(async () => {
        const { disconnectDB } = require('./config/db');
        await disconnectDB();
        process.exit(0);
      });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  } catch (err) {
    console.error('[Server] Failed to start server:', err);
    process.exit(1);
  }
}

startServer();
