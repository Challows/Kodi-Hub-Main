const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Define Routes
app.use('/api/users', require('./routes/User-registration'));
app.use('/api/auth', require('./routes/User-login'));
app.use('/api/properties', require('./routes/property-route'));
app.use('/api/units', require('./routes/Unit'));
app.use('/api/tickets', require('./routes/Ticket'));
app.use('/api/invoices', require('./routes/Invoice'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));