const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // dbName is forced here rather than relying on the connection string
    // containing it — Atlas's default "connect your application" string
    // has no database name in it, which makes MongoDB silently default to
    // a database literally called "test". Setting it explicitly here means
    // that mistake can't happen again, no matter what URI ends up in .env
    // locally or in a hosting provider's environment variables later.
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'ceylon-gem-souq',
    });
    console.log(`MongoDB connected: ${conn.connection.host} (db: ${conn.connection.name})`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    // Fail fast and loud: if the database can't be reached, the server
    // shouldn't keep running and silently fail on every request. Better
    // for Render to show a clear "crashed" status than a service that
    // looks alive but is actually broken underneath.
    process.exit(1);
  }
};

module.exports = connectDB;