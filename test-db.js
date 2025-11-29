const mysql = require('mysql2/promise');

async function testConnection() {
    console.log('Testing connection...');
    try {
        const connection = await mysql.createConnection({
            host: 'com-linweb842.srv.combell-ops.net',
            user: 'ID481076_blogpost',
            password: '9Z14868rEUOf4V4497cB',
            database: 'ID481076_blogpost',
            port: 3306
        });
        console.log('Successfully connected to the database!');
        await connection.end();
    } catch (error) {
        console.error('Connection failed:', error.message);
        console.error('Full error:', error);
    }
}

testConnection();
