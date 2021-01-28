const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const server = express();

// connection to database MongoDB
mongoose.connect('mongodb://localhost/omnistack8', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

server.use(express.json());
server.use(cors());
server.use(routes);

server.get('/', (req, res) => {
  return res.send('Hello World');
});

server.listen(3333, () => console.log('listening on port 3333'));