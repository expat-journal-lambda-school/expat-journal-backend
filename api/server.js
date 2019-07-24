const express = require('express'); 
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');
const postsRouter = require('../posts/posts-router.js');

server.use(express.json());
server.use(morgan('combined'));
server.use(helmet());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);
server.use('/api/posts', postsRouter);

server.use('/', (req, res) => {
  res.send("This is the API for Expat Journal")
});

module.exports = server;
