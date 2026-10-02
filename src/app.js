const express = require('express');

const app = express();

app.use(express.json());
const userRoutes = require('./routes/user.routes');
app.use('/api', userRoutes);
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

module.exports= app;