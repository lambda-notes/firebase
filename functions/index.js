// Firebase
const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Initialize Firebase
admin.initializeApp(functions.config().firebase);

//Databse reference
const db = admin.firestore();

// CORS middleware
const cors = require('cors')({
	origin: true
});

exports.addUser = functions.https.onRequest((req, res) => {
	if (req.method === 'PUT') {
		return res.status(403).send('Forbidden!');
	}

	// Enable CORS using the `cors` express middleware.
	return cors(req, res, () => {
		db.collection('users').add(req.body);
		res.status(200).send('Success');
	});
});

exports.addNote = functions.https.onCall(async (data, context) => {
	await db.collection('users').add(data);
	let user = await db
		.collection('users')
		.where('name', '==', 'mike')
		.get();

	return user.data();
});
