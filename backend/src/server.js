const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const app = express();
const server = require('http').Server(app);

// websocket configuration
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["user"],
    credentials: true
  }
});

const connectedUsers = {};

// websocket connection
io.on('connection', socket => {
  const { user } = socket.handshake.query;
  connectedUsers[user] = socket.id;
});

// connection to database MongoDB
mongoose.connect('mongodb://localhost/omnistack8', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;
  return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

app.get('/', (req, res) => {
  return res.send('Hello World');
});

server.listen(3333, () => console.log('listening on port 3333'));