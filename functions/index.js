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
app.get('/auth', async (req, res) => {
    const token = req.headers.authorization;

    try {
        let decodedToken = await admin.auth().verifyIdToken(token);
        if (decodedToken) {
            let firebaseUser = await admin.auth().getUser(decodedToken.uid);
            // let user = await getUserById(firebaseUser.uid);
            let user = await db
                .collection('users')
                .where('uid', '==', `${res.locals.uid}`)
                .get();
            console.log('GET USER', user);
            if (user) {
                res.status(200).json({ message: 'Success', data: user });
            } else {
                console.log('ELSE');
                const user = await db.collection('users').add({
                    uid: firebaseUser.uid,
                    displayName: firebaseUser.displayName,
                    email: firebaseUser.email,
                    avatar: firebaseUser.photoURL
                });
                if (user) {
                    res.status(200).json({ message: 'Success', data: user });
                } else {
                    res.status(500).json({ message: 'Unable to add user' });
                }
            }
        } else {
            res.status(403).json({ message: 'Invalid token', data: error });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', data: error });
    }
});

app.get('/user', async (req, res) => {
    const token = res.locals.uid;
    try {
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
