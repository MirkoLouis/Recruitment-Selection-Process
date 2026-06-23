# Changelog

## 2026-06-23 11:17 (v0.4.0-Alpha+202606231117)
### ADDED
- Replaced top navbar with a dedicated left sidebar layout.
- Migrated all dependencies from CDN to local NPM installations (Bootstrap, Icons).
- Redesigned "Add Applicant" process into a seamless 3-step Wizard.
- Implemented smart Application Code generation (`[District]-[Category]-[Increment]`).
- Split applicant names into `First Name` and `Last Name` fields natively within the database and UI.
- Added global Delete buttons across all tables for permanent record purging.
- Converted modal data submissions to perform in-place dynamic UI updates instead of full page reloads.
- Restructured `applicant_eligibility` database schema to utilize `digitalCopyLink` instead of manual inputs.
- Added a "SYSTEM GENERATED" footer to the assignment PDF letter template.

### FIXED
- Addressed an issue where modifying personal information did not immediately reflect on the dashboard tables.
- Fixed a bug causing delete buttons inside modals to inadvertently trigger page reloads.

---

## 2026-06-22 14:03 (v0.3.0-Alpha+202606221403)
### ADDED
- Added `nodemon` for Hot Module Replacement (HMR) to improve local development workflow.

### FIXED
- Fixed a small visual bug affecting the tab hover interactions.

---

## 2026-06-22 13:15 (v0.2.0-Alpha+202606221315)
### ADDED
- Miscellaneous optimizations to workflow and components (followup commit).

### FIXED
- Resolved minor layout shifting post-implementation.

---

## 2026-06-22 13:14 (v0.1.0-Alpha+202606221314)
### ADDED
- Added `.env.example` file for environment variable standardization.
- Standardized the main body layout styling.
- Added toggleable requirement features for applicant processing.
- Implemented a dynamic search box feature for applicants.

### FIXED
- Fixed PDF formatting issues causing misalignment on generated output.

---

## 2026-06-22 10:41 (v0.0.1-Alpha+202606221041)
### ADDED
- Initial project architecture and structure.
- Basic Express.js server and Handlebars templating initialization.
- Core MySQL database schema for applicant tracking system.

### FIXED
- N/A
