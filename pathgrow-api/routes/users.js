const express = require('express');
const db = require('../db');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Get All Users (Protected)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const result = await db.query('SELECT id, name, email, role, created_at FROM users');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
