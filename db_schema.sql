-- Database schema for OCR Based Invoice Processing System

CREATE DATABASE IF NOT EXISTS invoice_ocr_db;
USE invoice_ocr_db;

-- Table for storing templates
CREATE TABLE IF NOT EXISTS templates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    header_mapping JSON, -- Mapping of OCR labels to database fields
    line_item_mapping JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for storing invoices (Header)
CREATE TABLE IF NOT EXISTS invoices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    distributor VARCHAR(255),
    address TEXT,
    phone VARCHAR(50),
    gst_no VARCHAR(50),
    payable DECIMAL(15, 2),
    gundala_due DECIMAL(15, 2),
    invoice_date DATE,
    invoice_no VARCHAR(100),
    invoice_amt DECIMAL(15, 2),
    grn_date DATE,
    grn_no VARCHAR(100),
    grn_amt DECIMAL(15, 2),
    template_id INT,
    image_path VARCHAR(255),
    raw_ocr_text LONGTEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (template_id) REFERENCES templates(id)
);

-- Table for storing invoice line items
CREATE TABLE IF NOT EXISTS invoice_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    invoice_id INT,
    sno INT,
    code VARCHAR(100),
    description TEXT,
    qty INT,
    free INT,
    rate DECIMAL(15, 2),
    net_cost DECIMAL(15, 2),
    selling DECIMAL(15, 2),
    mrp DECIMAL(15, 2),
    net_amt DECIMAL(15, 2),
    dis1_percent DECIMAL(5, 2),
    dis1_amt DECIMAL(15, 2),
    tax_percent DECIMAL(5, 2),
    tax_amt DECIMAL(15, 2),
    amount DECIMAL(15, 2),
    tax_s_percent DECIMAL(5, 2),
    tax_s_amt DECIMAL(15, 2),
    roi_percent DECIMAL(5, 2),
    profit_percent DECIMAL(5, 2),
    FOREIGN KEY (invoice_id) REFERENCES invoices(id) ON DELETE CASCADE
);
