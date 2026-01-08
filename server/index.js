require('dotenv').config(); 

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get('/health', async (req, res) => {
  const health = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  };

  try {
    await mongoose.connection.db.admin().ping();
    health.database = 'connected';
  } catch (error) {
    health.status = 'DEGRADED';
    health.database = 'disconnected';
  }

  res
    .status(health.status === 'OK' ? 200 : 503)
    .json(health);
});


app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
