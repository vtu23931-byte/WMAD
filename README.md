# 🛍️ E-Commerce Three-Tier Architecture

This project demonstrates a **three-tier e-commerce web application** structure — separating the presentation layer, application logic, and data layer for scalability and maintainability.

---

## 📁 Project Structure

## Project Structure

```text
.
├── index.html
├── product.html
│
├── css/
│   └── styles.css
│
├── js/
│   └── index.js
│
├── images/
│   ├── hero-1.png
│   ├── hero-2.png
│   ├── cat1.jpg
│   ├── cat2.jpg
│   ├── cat3.jpg
│   └── product-1.jpg
│
├── server/
│   ├── server.js          # Express server entry point
│   ├── package.json       # Backend dependencies
│   ├── Dockerfile         # Docker setup for server
│   ├── .env.example       # Example environment variables
│   └── db-init.sql        # Database initialization script
│
└── docker-compose.yml
