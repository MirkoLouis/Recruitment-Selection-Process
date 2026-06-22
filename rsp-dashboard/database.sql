CREATE DATABASE IF NOT EXISTS rsp_db;
USE rsp_db;

CREATE TABLE IF NOT EXISTS applicants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    trackingNumber VARCHAR(50) DEFAULT NULL,
    status ENUM('PENDING', 'QUALIFIED', 'DISQUALIFIED', 'COMPLETED') DEFAULT 'PENDING',
    interviewScore INT DEFAULT NULL,
    interviewDate DATE DEFAULT NULL,
    assignedOffice VARCHAR(255) DEFAULT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert some dummy data for testing
INSERT INTO applicants (name, status) VALUES ('John Doe', 'PENDING');
INSERT INTO applicants (name, status) VALUES ('Jane Smith', 'PENDING');
