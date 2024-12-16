require('dotenv').config();
const express = require('express');
const cors = require("cors");

const middlewareLogRequest = require('./middleware/usersMiddleware');

const usersRoutes = require('./routes/usersRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Ganti dengan URL frontend Anda
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(middlewareLogRequest);
app.use(express.json());

app.use('/users', usersRoutes);
app.use('/auth', authRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
})