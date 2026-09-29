const mongoose = require('mongoose');
const { mongoUri } = require('./env');

async function connectDB() {
  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // kay-wa9ef serveur ila database ma tconnectatch
  }
}

module.exports = connectDB;