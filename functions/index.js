// Firebase
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const auth = require('./middleware/auth');

const express = require('express');
const cors = require('cors');

const app = express();

// Initialize Firebase
admin.initializeApp(functions.config().firebase);

//Databse reference
const db = admin.firestore();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// Add middleware to authenticate requests
app.use(auth);

// build multiple CRUD interfaces:

app.post('/user', async (req, res) => {
	const token = res.locals.uid;
	try {
		await db.collection('users').add(data);
		let user = await db
			.collection('users')
			.where('uid', '==', `${token}`)
			.get();
		res.status(200).json({ message: 'Success', data: user });
	} catch (error) {
		res.status(500).json({ message: 'Server error', data: error });
	}
});

// Expose Express API as a single Cloud Function:
exports.api = functions.https.onRequest(app);
