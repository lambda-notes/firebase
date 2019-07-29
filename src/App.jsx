import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

// data management
import { useStateValue } from 'react-conflux';
import { globalContext } from './store/contexts';
import { url } from './components/Auth/config';

// style imports
import { GlobalStyles } from './styles';

// component imports
// import Auth from './components/Auth';
import MainDashboard from './components/MainDashboard';
import Landing from './components/Landing';
import SideNav from './components/SideNav';
import MobileNav from './components/MainDashboard/MobileNav';
import Modal from './components/Modal/Modal';
import { SET_TOKEN } from './store/constants';
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebaseConfig from './firebase/fbaseConfig';

let firebase = require('firebase/app');
require('firebase/auth');

firebase.initializeApp(firebaseConfig);
let provider = new firebase.auth.GithubAuthProvider();
provider.addScope('read:user');
firebase.auth().useDeviceLanguage();

function App(props) {
	const [state, dispatch] = useStateValue(globalContext);
	const { user, modalOpen } = state;

	const [window_width, setWidth] = useState(window.innerWidth);
	useEffect(() => {
		const handleResize = () => setWidth(window.innerWidth);
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);
	useEffect(() => {
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				// User is signed in.
				// getToken();
			} else {
				// No user is signed in.
				console.log('no user signed in');
			}
		});
	});
	console.log(state.token);

	const getToken = async () => {
		let token = firebase.auth().currentUser.getIdToken(/* forceRefresh */ true);
		dispatch({ type: SET_TOKEN, payload: token });
	};
	const handleLogin = async () => {
		try {
			let token = await firebase.auth().signInWithPopup(provider);

			dispatch({ type: SET_TOKEN, payload: token });
			// ...
		} catch (error) {
			console.log(error);
		}
	};

	const handleLogout = async () => {
		await firebase.auth().signOut();

		dispatch({ type: SET_TOKEN, payload: '' });
		// history.push('/');
	};

	return (
		<>
			<GlobalStyles />
			<Styles>
				{state.user.uid ? (
					<div className='main-view'>
						{window_width <= 800 ? (
							<Route path='/dashboard' component={MobileNav} />
						) : (
							<Route path='/dashboard' component={SideNav} />
						)}
						<Route path='/dashboard' component={MainDashboard} />
					</div>
				) : (
					<>
						{/* modalOpen && <Modal /> */}
						<Route
							exact
							path='/'
							render={props => (
								<Landing
									handleLogin={handleLogin}
									handleLogout={handleLogout}
									{...props}
								/>
							)}
						/>
					</>
				)}
				{/* <Route path="/login" component={Auth} /> */}
			</Styles>
		</>
	);
}

export default App;

const Styles = styled.div`
	height: 100vh;
	.main-view {
		display: flex;
		height: 100vh;

		@media (max-width: 800px) {
			flex-direction: column;
		}
	}
`;
