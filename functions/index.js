const functions = require('firebase-functions');
const admin = require('firebase-admin');
// admin.initializeApp(functions.config().firebase);
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

const express = require('express');
const cors = require('cors');

const app = express();

//Middleware
app.use(cors({ origin: true }));
app.use((req, res, next) => {
	req.db = db;
	next();
});

const usersRouter = require('./users/usersRouter');
const notesRouter = require('./notes/notesRouter');
const lessonsRouter = require('./lessons/lessonsRouter');
const videosRouter = require('./videos/videosRouter');
const trackRouter = require('./track/trackRouter');
const sprintsRouter = require('./sprints/sprintsRouter');

// Router assignments
app.use('/users', usersRouter);
app.use('/notes', notesRouter);
app.use('/lessons', lessonsRouter);
app.use('/videos', videosRouter);
app.use('/tracks', trackRouter);
app.use('/sprints', sprintsRouter);

exports.lambdaNotes = functions.https.onRequest(app);
