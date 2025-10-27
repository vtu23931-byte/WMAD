CREATE DATABASE IF NOT EXISTS ecommercedb;
USE ecommercedb;

DROP TABLE IF EXISTS products;
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT,
  image VARCHAR(255)
);

INSERT INTO products (name, price, description, image) VALUES
('Laptop', 1200.00, 'High performance laptop', 'product-1.jpg'),
('Smartphone', 800.00, 'Latest smartphone', 'product-1.jpg'),
('Men Shirt', 150.00, 'Cotton shirt for men', 'product-1.jpg');

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fullName VARCHAR(200) NOT NULL,
  email VARCHAR(200) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  phone VARCHAR(30),
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
