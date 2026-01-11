const { Client } = require('pg');
require('dotenv').config();

async function clearDatabase() {
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'erecord_db',
  });

  try {
    await client.connect();
    console.log('Connected to database');

    // Clear tables in order (respecting foreign key constraints)
    await client.query('DELETE FROM notifications');
    console.log('✅ Cleared notifications');

    await client.query('DELETE FROM inventory_items');
    console.log('✅ Cleared inventory items');

    await client.query('DELETE FROM payrolls');
    console.log('✅ Cleared payrolls');

    await client.query('DELETE FROM expenses');
    console.log('✅ Cleared expenses');

    await client.query('DELETE FROM fees');
    console.log('✅ Cleared fees');

    // Clear non-admin users first, then update admin users to remove school references
    await client.query("DELETE FROM users WHERE role != 'admin'");
    console.log('✅ Cleared non-admin users');

    // Remove school references from admin users
    await client.query("UPDATE users SET \"schoolId\" = NULL WHERE role = 'admin'");
    console.log('✅ Removed school references from admin users');

    // Clear all schools
    await client.query('DELETE FROM schools');
    console.log('✅ Cleared all schools');

    console.log('\n🎉 Database cleanup completed successfully!');
    console.log('📝 Admin user (admin@gmail.com / admin123) is preserved');
    console.log('🚀 You can now start fresh registrations');

  } catch (error) {
    console.error('❌ Error during cleanup:', error);
  } finally {
    await client.end();
  }
}

clearDatabase();