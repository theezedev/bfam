const mysql = require('mysql2/promise');

// Establish connection to database
const connection = mysql.createPool({
    host: 'localhost',
    user: 'howthxwo_bfamAPI',
    password: 'Breakfast@9!',
    database: 'howthxwo_bfam',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0
});

exports.connection = connection;