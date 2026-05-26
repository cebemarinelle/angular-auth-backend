const app = require('./app');
const db = require('./src/config/database');

const PORT = process.env.PORT || 4000;

// Test database connection
async function testDatabaseConnection() {
  try {
    const [result] = await db.execute('SELECT 1');
    console.log('✅ Database connected successfully to Aiven MySQL');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
}

// Start server
async function startServer() {
  const isConnected = await testDatabaseConnection();
  
  if (!isConnected) {
    console.error('Exiting due to database connection failure');
    process.exit(1);
  }
  
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📝 API Docs available at http://localhost:${PORT}/api-docs`);
  });
}

startServer();