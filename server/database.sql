CREATE DATABASE digitalInvoice;

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(255),
    user_address VARCHAR(255),
    user_email VARCHAR(255) UNIQUE
);

CREATE TABLE invoices(
    invoice_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    invoice_number VARCHAR(50) UNIQUE,
    invoice_date VARCHAR(7), 
    total_amount DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);