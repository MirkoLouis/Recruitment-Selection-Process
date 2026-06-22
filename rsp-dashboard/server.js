require('dotenv').config();
const express = require('express');
const hbs = require('hbs');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// View Engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

// Helper for index calculation
hbs.registerHelper('inc', function(value, options) {
    return parseInt(value) + 1;
});

// Helper for conditional rendering in hbs
hbs.registerHelper('eq', function (a, b) {
    return a === b;
});

// Helper for formatting date
hbs.registerHelper('formatDate', function(date) {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
});

// Routes
app.get('/', async (req, res) => {
    try {
        const [applicants] = await db.query('SELECT * FROM applicants ORDER BY createdAt DESC');
        
        // Group applicants by status for different tabs
        const pending = applicants.filter(a => a.status === 'PENDING');
        const qualified = applicants.filter(a => a.status === 'QUALIFIED' && a.interviewScore === null);
        const interviewed = applicants.filter(a => a.status === 'QUALIFIED' && a.interviewScore !== null).sort((a, b) => b.interviewScore - a.interviewScore);
        
        res.render('index', { 
            applicants,
            pending,
            qualified,
            interviewed
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Database Error');
    }
});

// API Routes
// Add new applicant
app.post('/api/applicants', async (req, res) => {
    try {
        const { name } = req.body;
        await db.query('INSERT INTO applicants (name) VALUES (?)', [name]);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Update applicant status (Qualify/Disqualify)
app.post('/api/applicants/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const { status, interviewDate, trackingNumber } = req.body;
        
        let query = 'UPDATE applicants SET status = ?';
        let params = [status];
        
        if (interviewDate) {
            query += ', interviewDate = ?';
            params.push(interviewDate);
        }
        if (trackingNumber) {
            query += ', trackingNumber = ?';
            params.push(trackingNumber);
        }
        
        query += ' WHERE id = ?';
        params.push(id);
        
        await db.query(query, params);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Update applicant score and assigned office
app.post('/api/applicants/:id/score', async (req, res) => {
    try {
        const { id } = req.params;
        const { interviewScore, assignedOffice } = req.body;
        
        await db.query('UPDATE applicants SET interviewScore = ?, assignedOffice = ? WHERE id = ?', 
            [interviewScore, assignedOffice || 'Pending Assignment', id]);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
