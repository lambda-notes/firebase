import React, { useState, useEffect, useCallback } from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import API from './utils/API';

// data management
import { useStateValue } from 'react-conflux';
import { globalContext } from './store/contexts';
import { url } from './components/Auth/config';

// style imports
import { GlobalStyles } from './styles';

// component imports
import MainDashboard from './components/MainDashboard';
import Landing from './components/Landing';
import SideNav from './components/SideNav';
import MobileNav from './components/MainDashboard/MobileNav';
import Modal from './components/Modal/Modal';
import { SET_TOKEN, SET_USER } from './store/constants';
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
    const getUserToken = useCallback(async () => {
        let idToken = await firebase
            .auth()
            .currentUser.getIdToken(/* forceRefresh */ true);
        if (!state.token) {
            dispatch({ type: SET_TOKEN, payload: idToken });
        }
    }, [dispatch, state.token]);
    const getUserData = useCallback(async () => {
        try {
            if (state.token) {
                console.log('GET USER DATA');
                let response = await API.get('/auth', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: state.token
                    }
                });
                console.log(response);
                dispatch({ type: SET_USER, payload: response.data.data });
            }
        } catch (error) {
            console.log(error);
        }
    }, [dispatch, state.token]);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(user) {
            console.log(user);
            if (user) {
                getUserToken();
                if (!state.user.id) {
                    getUserData();
                }
            } else {
                console.log('Not signed in!');
            }
        });
    }, [getUserData, getUserToken, state.token, state.user.id]);
    const handleLogin = async () => {
        try {
            await firebase.auth().signInWithPopup(provider);
            getUserToken();
            getUserData();
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
                    <div className="main-view">
                        {window_width <= 800 ? (
                            <Route
                                path="/dashboard"
                                render={props => (
                                    <MobileNav
                                        handleLogout={handleLogout}
                                        {...props}
                                    />
                                )}
                            />
                        ) : (
                            <Route
                                path="/dashboard"
                                render={props => (
                                    <SideNav
                                        handleLogout={handleLogout}
                                        {...props}
                                    />
                                )}
                            />
                        )}
                        <Route
                            path="/dashboard"
                            render={props => (
                                <MainDashboard
                                    handleLogout={handleLogout}
                                    {...props}
                                />
                            )}
                        />
                    </div>
                ) : (
                    <>
                        {/* modalOpen && <Modal /> */}
                        <Route
                            exact
                            path="/"
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
