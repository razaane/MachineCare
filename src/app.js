const express = require('express');

const app = express();

app.use(express.json());
const userRoutes = require('./routes/user.routes');
app.use('/api', userRoutes);

const machineRoutes = require('./routes/machine.routes');
app.use('/api', machineRoutes);

module.exports= app;