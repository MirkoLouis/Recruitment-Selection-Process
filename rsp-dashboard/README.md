# Recruitment Selection Process (RSP) Dashboard

A web-based platform to digitize the recruitment selection process.

## Tech Stack
- **Backend:** Node.js, Express
- **Frontend:** Handlebars (hbs), Vanilla JS, Bootstrap 5, Custom CSS
- **Database:** MySQL

## Features
- **Step 1:** Notice of Requirements (Qualify/Disqualify Applicants)
- **Step 2:** Deliberation Sheet (Assess & Input Interview Scores)
- **Step 3:** Comparative Assessments (Leaderboard based on Scores)
- **Step 4:** Assignment Orders (Generate & Print A4 Assignment Letters)

## Installation
1. Clone or download this directory.
2. Run `npm install` to install dependencies.
3. Import `database.sql` into your MySQL instance to create the schema and initial data.
4. Update `.env` file with your MySQL credentials (if not using the default root user without password).
5. Run the server using `npm start` or `node server.js`.

## Running Locally
Access the app at `http://localhost:3000`.
