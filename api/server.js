const express = require('express');

const LoginRouter = require('../login/login-router.js');

const server = express();

server.use(express.json());
server.use('/api', LoginRouter)

module.exports = server;