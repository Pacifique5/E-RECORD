const { Client } = require('pg');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function createAdmin() {
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'erecord_db',
  });

  try {
    await client.connect();
    console.log('✅ Connected to database');

    // Check if admin exists
    const checkAdmin = await client.query(
      'SELECT * FROM users WHERE email = $1',
      ['admin@gmail.com']
    );

    if (checkAdmin.rows.length > 0) {
      console.log('⚠️  Admin user already exists!');
      console.log('🔑 Login credentials:');
      console.log('   Email: admin@gmail.com');
      console.log('   Password: admin123');
      console.log('🌐 Login at: http://localhost:3000/registration/login');
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Create admin user
    const result = await client.query(`
      INSERT INTO users (id, email, "firstName", "lastName", password, role, "isActive", "createdAt", "updatedAt")
      VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, NOW(), NOW())
      RETURNING *
    `, [
      'admin@gmail.com',
      'System',
      'Administrator', 
      hashedPassword,
      'admin',
      true
    ]);

    console.log('🎉 Admin user created successfully!');
    console.log('📧 Email: admin@gmail.com');
    console.log('🔑 Password: admin123');
    console.log('🌐 Login at: http://localhost:3000/registration/login');
    console.log('📊 Admin Dashboard: http://localhost:3000/admin');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.end();
  }
}

createAdmin();