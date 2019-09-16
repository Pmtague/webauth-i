const DB = require('../data/db-config.js');

module.exports = {
	find,
	findBy,
	add,
	findById
};

function find() {
	return DB('users')
		.select('id', 'username', 'password');
};

function findBy(filter) {
	return DB('users')
		.where(filter);
};

function add(user) {
	return DB('users')
		.insert(user, 'id')
		.then(ids => {
			const [id] =ids;
			return findById(id);
		});
};

function findById(id) {
	return DB('users')
		.where({ id })
		.first();
};