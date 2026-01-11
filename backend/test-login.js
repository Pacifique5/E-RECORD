const { Client } = require('pg');
require('dotenv').config();

async function testLogin() {
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'erecord_db',
  });

  try {
    await client.connect();
    
    // Get user with school info
    const result = await client.query(`
      SELECT u.id, u.email, u.role, u."firstName", u."lastName",
             s.id as school_id, s.name as school_name, s.code as school_code, s.status as school_status
      FROM users u
      LEFT JOIN schools s ON u."schoolId" = s.id
      WHERE u.email = $1
    `, ['pacifiquem58@gmail.com']);
    
    if (result.rows.length > 0) {
      const user = result.rows[0];
      console.log('User found:');
      console.log(`- Email: ${user.email}`);
      console.log(`- Role: ${user.role}`);
      console.log(`- Name: ${user.firstName} ${user.lastName}`);
      console.log(`- School: ${user.school_name || 'No school'}`);
      console.log(`- School Code: ${user.school_code || 'No code'}`);
      console.log(`- School Status: ${user.school_status || 'No status'}`);
      
      // Expected login response format
      console.log('\nExpected login response:');
      console.log(JSON.stringify({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        school: user.school_id ? {
          id: user.school_id,
          name: user.school_name,
          code: user.school_code,
          status: user.school_status
        } : null
      }, null, 2));
    } else {
      console.log('User not found!');
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.end();
  }
}

testLogin();