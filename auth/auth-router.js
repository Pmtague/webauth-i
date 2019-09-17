const router = require('express').Router();
const bcrypt = require('bcrypt');

const Users = require('../users/user-model.js');

// For endpoints beginning with /api
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
				req.session.user = user;
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

router.get('/logout', (req, res) => {
	if (req.session) {
		req.session.destroy(err => {
			if (err) {
				res.send('Error logging out');
			} else {
				res.send('Goodbye');
			}
		});
	}
});

module.exports = router;