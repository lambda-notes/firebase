import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';

// Conflux
import { useStateValue } from 'react-conflux';
import { globalContext } from '../../store/contexts';
import { SET_TOKEN } from '../../store/constants';

// component imports
import AdminDash from '../AdminDash';
import NotesDash from '../NotesDash';
import TopNav from './TopNav';

const MainDash = () => {
	const [state, dispatch] = useStateValue(globalContext);
	const isAdmin = false;

	return (
		<Styles>
			<TopNav />
			{isAdmin && <Route path='/dashboard/admin' component={AdminDash} />}
			<Route path='/dashboard' component={NotesDash} />
			{/* <Route path="/dashboard/:id" component={Note} /> */}
		</Styles>
	);
};

export default MainDash;

const Styles = styled.div`
	min-width: calc(100vw - 320px);

	@media (max-width: 800px) {
		width: 100%;
	}
`;
