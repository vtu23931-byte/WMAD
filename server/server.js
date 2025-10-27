require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcrypt'); // optional: if you want to hash passwords, install bcrypt

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve frontend static files (project root must serve these)
app.use('/', express.static(path.join(__dirname, '..'))); // serve index.html and static assets

// DB connection helper
let pool;
async function initDb() {
  pool = await mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'ecommercedb',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
  console.log('DB pool created');
}
initDb().catch(err => {
  console.warn('Could not connect to DB. API endpoints may fail.', err.message || err);
});

// GET /api/products - fetch all products
app.get('/api/products', async (req, res) => {
  try {
    if (!pool) throw new Error('DB not initialized');
    const [rows] = await pool.query('SELECT id, name, price, description, image FROM products');
    res.json(rows);
  } catch (err) {
    console.error(err);
    // fallback: return small in-memory list
    res.json([
      { id: 1, name: 'Laptop (fallback)', price: 1200.0, description: 'fallback product', image: 'product-1.jpg' }
    ]);
  }
});

// GET single product
app.get('/api/products/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, name, price, description, image FROM products WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).send('Product not found');
    res.json(rows[0]);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// POST /api/products - create product (simple)
app.post('/api/products', async (req, res) => {
  try {
    const { name, price, description, image } = req.body;
    const [result] = await pool.query('INSERT INTO products (name, price, description, image) VALUES (?, ?, ?, ?)', [name, price, description || '', image || 'product-1.jpg']);
    const inserted = { id: result.insertId, name, price, description, image };
    res.status(201).json(inserted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/register - basic registration (stores hashed password)
app.post('/api/register', async (req, res) => {
  try {
    const { fullName, email, password, phone, address } = req.body;
    if (!fullName || !email || !password) return res.status(400).json({ error: 'Missing required fields' });

    const saltRounds = 10;
    const hashed = await require('bcrypt').hash(password, saltRounds);

    await pool.query('INSERT INTO users (fullName, email, password_hash, phone, address) VALUES (?, ?, ?, ?, ?)', [fullName, email, hashed, phone || '', address || '']);
    res.status(201).json({ message: 'Registered' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// fallback for anything else (let static host index)
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
