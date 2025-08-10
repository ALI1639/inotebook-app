const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

// Connect to MongoDB
connectToMongo();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Test Route
app.get('/', (req, res) => {
  res.send('Server is running — ALI Kase hoo');
});

app.listen(port, () => {
  console.log(`inotebook backend at http://localhost:${port}`);
});
