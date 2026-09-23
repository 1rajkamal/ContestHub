const mongoose = require('mongoose');

let mongoServer = null;

/**
 * Connect to MongoDB with automated in-memory fallback.
 * If MONGODB_URI is provided, connects to it.
 * If not provided or local daemon fails, starts embedded MongoMemoryServer
 * so reviewers can test zero-config without installing MongoDB locally.
 */
async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (uri) {
    try {
      console.log(`[DB] Attempting connection to specified URI: ${uri.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@')}`);
      await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 5000,
      });
      console.log('[DB] Successfully connected to MongoDB.');
      return mongoose.connection;
    } catch (err) {
      console.warn(`[DB] Could not connect to MONGODB_URI (${err.message}). Falling back to embedded MongoMemoryServer...`);
    }
  }

  try {
    const { MongoMemoryServer } = require('mongodb-memory-server');
    console.log('[DB] Starting embedded MongoMemoryServer for standalone zero-config execution...');
    mongoServer = await MongoMemoryServer.create();
    const memoryUri = mongoServer.getUri();
    await mongoose.connect(memoryUri);
    console.log(`[DB] Connected to embedded MongoDB at: ${memoryUri}`);
    return mongoose.connection;
  } catch (err) {
    console.error('[DB] Critical: Failed to initialize MongoDB connection:', err);
    throw err;
  }
}

async function disconnectDB() {
  try {
    await mongoose.disconnect();
    if (mongoServer) {
      await mongoServer.stop();
    }
    console.log('[DB] Disconnected from MongoDB.');
  } catch (err) {
    console.error('[DB] Error during MongoDB disconnect:', err);
  }
}

module.exports = { connectDB, disconnectDB };
