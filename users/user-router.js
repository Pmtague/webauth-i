const express = require('express');
const bcrypt = require('bcrypt');

const Users = require('./user-model.js');
const DB = require('../data/db-config.js');
const restricted = require('../auth/restricted-middleware.js');

const router = express.Router();

router.post('/register', (req, res) => {
	let { username, password } = req.body;

	const hash = bcrypt.hashSync(password, 12);

	Users.add({ username, password: hash })
		.then(saved => {
			res.status(201).json(saved);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: 'Could not register user' });
		});
});

router.post('/login', (req, res) => {
	let { username, password } = req.body;

	Users.findBy({ username })
		.first()
		.then(user => {
			if (user && bcrypt.compareSync(password, user.password)) {
				res.status(200).json({ message: `Welcome, ${ user.username }!` });
			} else {
				res.status(401).json({ message: 'You shall not pass!' });
			};
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: 'Could not find user' });
		});
});

router.get('/users', restricted, (req, res) => {
	Users.find()
		.then(users => {
			res.status(200).json(users);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: 'Could not find users' });
		});
});

module.exports = router;