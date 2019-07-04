// const functions = require('firebase-functions');
// const admin = require('firebase-admin');
// admin.initializeApp(functions.config().firebase);
// const db = admin.firestore();

module.exports = {
	find,
	findById,
	insert,
	remove,
	update
};

function find(db) {
	return db('users');
}

function findById(id) {
	return db('users')
		.where({ id })
		.first();
}

// Finish all below this line later

function insert(creds) {
	return db('users')
		.insert(creds)
		.then(ids => ids);
}

function update(id, changes) {
	return db('users')
		.where({ id })
		.update(changes);
}

function remove(id) {
	return db('users')
		.where({ id })
		.del();
}
