require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function seed() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        multipleStatements: true // Allows executing the entire SQL file at once
    });

    try {
        console.log('🔄 Starting database seed process...');

        // Ensure DB exists before using
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'rsp_db'}`);
        await connection.query(`USE ${process.env.DB_NAME || 'rsp_db'}`);

        console.log('🧹 Dropping existing applicants table to apply any schema updates...');
        await connection.query('DROP TABLE IF EXISTS applicants');

        // 1. Run database.sql
        const sqlFilePath = path.join(__dirname, 'database.sql');
        const sqlQuery = fs.readFileSync(sqlFilePath, 'utf8');
        
        console.log('📦 Executing database.sql...');
        await connection.query(sqlQuery);
        console.log('✅ Schema initialized.');

        // 2. Clear existing applicants (since database.sql might have inserted dummy data)
        await connection.query('TRUNCATE TABLE applicants');
        console.log('🧹 Cleared existing applicants data.');

        // 3. Generate Mock Data
        const firstNames = ['James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica'];
        const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
        const offices = ['Engineering Dept', 'HR Dept', 'Marketing Office', 'Executive Suite', 'Finance Dept'];

        const generateName = () => `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
        const generateTracking = () => 'RSP-' + Math.random().toString(36).substr(2, 6).toUpperCase();
        
        // Generates an interview date 1 to 2 weeks away, strictly Monday to Thursday
        const generateInterviewDate = () => {
            let valid = false;
            let d;
            while (!valid) {
                const daysToAdd = Math.floor(Math.random() * 8) + 7; // 7 to 14 days
                d = new Date();
                d.setDate(d.getDate() + daysToAdd);
                const dayOfWeek = d.getDay();
                if (dayOfWeek >= 1 && dayOfWeek <= 4) valid = true; // 1=Mon ... 4=Thu
            }
            return d.toISOString().split('T')[0];
        };

        const insertQuery = 'INSERT INTO applicants (name, trackingNumber, status, interviewScore, interviewDate, assignedOffice) VALUES ?';
        const values = [];

        // 10 PENDING (Step 1)
        for (let i = 0; i < 10; i++) {
            values.push([generateName(), null, 'PENDING', null, null, null]);
        }

        // 10 QUALIFIED without score (Step 2)
        for (let i = 0; i < 10; i++) {
            values.push([generateName(), generateTracking(), 'QUALIFIED', null, generateInterviewDate(), null]);
        }

        // 10 QUALIFIED with score (Step 3 & 4)
        for (let i = 0; i < 10; i++) {
            const score = Math.floor(Math.random() * 31) + 70; // Random score between 70 and 100
            const office = offices[Math.floor(Math.random() * offices.length)];
            values.push([generateName(), generateTracking(), 'QUALIFIED', score, generateInterviewDate(), office]);
        }

        // Execute batch insert
        await connection.query(insertQuery, [values]);
        console.log('✅ Inserted 30 mock applicants (10 Pending, 10 Qualified, 10 Scored).');
        
        console.log('🎉 Seeding completed successfully!');
    } catch (error) {
        console.error('❌ Seeding failed:', error.message);
    } finally {
        await connection.end();
    }
}

seed();
