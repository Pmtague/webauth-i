const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);


const UserRouter = require('../users/user-router.js');
const AuthRouter = require('../auth/auth-router.js');
const dbConnection = require('../data/db-config.js');
const restricted = require('../auth/restricted-middleware.js');

const server = express();

const sessionConfig = {
	name: 'goat',
	secret: process.env.SESSION_SECRET || "Keep it secret, keep it safe",
	cookie: {
		maxAge: 1 * 24 * 60 * 60 * 1000,
		secure: false,
	},
	httpOnly: true,
	resave: false,
	saveUninitialized: true,
	store: new KnexSessionStore({
		knex: dbConnection,
		tablename: 'knexsessions',
		createtable: true,
		clearInterval: 1000 * 60 * 30,
	}),
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use('/api/restricted', restricted, UserRouter);
server.use('/api', AuthRouter)

module.exports = server;