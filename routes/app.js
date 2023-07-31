const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Connect to your MongoDB database
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const routes = require('./routes/index');

app.use(express.json());

// Mount the routes on the /api path
app.use('/api', routes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
