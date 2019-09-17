const express = require('express');

const Users = require('./user-model.js');

const router = express.Router();

// For routes starting with /api/restricted
router.get('/users', (req, res) => {
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