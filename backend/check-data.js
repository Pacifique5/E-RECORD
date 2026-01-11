const { Client } = require('pg');
require('dotenv').config();

async function checkData() {
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'erecord_db',
  });

  try {
    await client.connect();
    
    // Check users
    const users = await client.query('SELECT id, email, role, "schoolId" FROM users');
    console.log('Users in database:');
    users.rows.forEach(user => {
      console.log(`- ${user.email} (${user.role}) - School ID: ${user.schoolId}`);
    });
    
    // Check schools
    const schools = await client.query('SELECT id, name, code, status FROM schools');
    console.log('\nSchools in database:');
    schools.rows.forEach(school => {
      console.log(`- ${school.name} (${school.code}) - Status: ${school.status}`);
    });
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.end();
  }
}

checkData();