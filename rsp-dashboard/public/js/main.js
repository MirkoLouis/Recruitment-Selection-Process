// DOM Elements
const addApplicantForm = document.getElementById('addApplicantForm');
const qualifyForm = document.getElementById('qualifyForm');
const scoreForm = document.getElementById('scoreForm');

// Helper for generating tracking numbers
const generateTrackingNumber = () => {
    return 'RSP-' + Math.random().toString(36).substr(2, 6).toUpperCase();
};

// Add Applicant
if (addApplicantForm) {
    addApplicantForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('applicantName').value;
        
        try {
            const res = await fetch('/api/applicants', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name })
            });
            if (res.ok) window.location.reload();
        } catch (err) {
            console.error(err);
            alert('Error adding applicant');
        }
    });
}

// Open Qualify Modal
function openQualifyModal(id, name) {
    document.getElementById('qualifyId').value = id;
    document.getElementById('qualifyName').innerText = name;
    // Set default date to today
    document.getElementById('interviewDate').value = new Date().toISOString().split('T')[0];
    new bootstrap.Modal(document.getElementById('qualifyModal')).show();
}

// Submit Qualify
if (qualifyForm) {
    qualifyForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('qualifyId').value;
        const interviewDate = document.getElementById('interviewDate').value;
        const trackingNumber = generateTrackingNumber();
        
        try {
            const res = await fetch(`/api/applicants/${id}/status`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'QUALIFIED', interviewDate, trackingNumber })
            });
            if (res.ok) window.location.reload();
        } catch (err) {
            console.error(err);
            alert('Error qualifying applicant');
        }
    });
}

// Disqualify Applicant
async function disqualifyApplicant(id) {
    if(confirm('Are you sure you want to disqualify this applicant?')) {
        try {
            const res = await fetch(`/api/applicants/${id}/status`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'DISQUALIFIED' })
            });
            if (res.ok) window.location.reload();
        } catch (err) {
            console.error(err);
        }
    }
}

// Open Score Modal
function openScoreModal(id, name) {
    document.getElementById('scoreId').value = id;
    document.getElementById('scoreName').innerText = name;
    new bootstrap.Modal(document.getElementById('scoreModal')).show();
}

// Submit Score
if (scoreForm) {
    scoreForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('scoreId').value;
        const interviewScore = document.getElementById('interviewScore').value;
        const assignedOffice = document.getElementById('assignedOffice').value;
        
        try {
            const res = await fetch(`/api/applicants/${id}/score`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ interviewScore, assignedOffice })
            });
            if (res.ok) {
                // To show the change without reloading, we could manipulate DOM, but reload is safer to sort
                window.location.reload();
            }
        } catch (err) {
            console.error(err);
            alert('Error submitting score');
        }
    });
}

// Print Letter
function printLetter(name, office, dateStr) {
    // Populate the print container
    document.getElementById('printName').innerText = name;
    document.getElementById('printOffice').innerText = office;
    
    // Format Date neatly
    const d = dateStr ? new Date(dateStr) : new Date();
    const formattedDate = d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    document.getElementById('printDate').innerText = 'Date: ' + formattedDate;
    
    // Trigger print
    window.print();
}
