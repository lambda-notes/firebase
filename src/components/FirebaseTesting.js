import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
const firebase = require('firebase');
// Required for side-effects
require('firebase/functions');

//initialize firebase here with firebase.initializeApp
//API key should not be stored on github

// Initialize Cloud Functions through Firebase
const functions = firebase.functions();

const user = {
	id: 2,
	name: 'john'
};

let addNote = firebase.functions().httpsCallable('addNote');

function App() {
	const [state, setState] = useState();

	addNote({ user }).then(function(result) {
		// Read result of the Cloud Function.
		setState(result);
		// ...
	});
	return <h1>Firebase Testing</h1>;
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
