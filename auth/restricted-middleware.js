const bcrypt = require('bcrypt');

const Users = require('../users/user-model.js');

module.exports = (req, res, next) => {
	let { username, password } = req.headers;

	Users.findBy({ username })
		.first()
		.then(user => {
			if (user && bcrypt.compareSync(password, user.password)) {
				next();
			} else {
				res.status(401).json({ message: 'You shall not pass!' })
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: 'Cannot find account' });
		});
};

function fetch() {
	const reqOptions = {
		headers: {
			username: "",
			password: "",
		},
	};

	// axios.get(url, reqOptions).the().catch()
  	// axios.post(url, data, reqOptions).the().catch()
};

