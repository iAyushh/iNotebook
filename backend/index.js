require('dotenv').config();

const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors');

// Connect to MongoDB
connectToMongo();


const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Start the server
app.listen(port, () => {
  console.log(`iNotebook listening at http://localhost:${port}`);
  console.log("JWT_SECRET:", process.env.JWT_SECRET);
  
});
