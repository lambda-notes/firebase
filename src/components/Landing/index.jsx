import React, { useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
// Conflux
import { useStateValue } from 'react-conflux';
import { globalContext } from '../../store/contexts';

// import { url } from '../Auth/config';

const Landing = props => {
	const [state, dispatch] = useStateValue(globalContext);


	return (
		<Styles>
			<div className='background' />
			<div className='wrapper'>
				<div className='TopMain'>
					<img
						className='logo'
						src={require('./images/Lambda_Notes_Logo.png')}
						alt='Lambda Notes'
					/>
					{state.token ? (
						<a href='/dashboard' className='LoginButton'>
							Dashboard
						</a>
					) : (
						<div className='LoginButton' onClick={props.handleLogin}>
							Login
						</div>
					)}
				</div>

				<div className='mainContent'>
					<div className='heroWrapper'>
						<img
							className='mainImage'
							src={require('./images/lambda_notes_dashboard.jpg')}
							alt='Lambda Notes Screenshot'
						/>
					</div>
					<div className='mainContentRight'>
						<p className='title'>Next Level Notes</p>

						{/* <div className='mainLoginButton'>
							<a href='https://lambda-school-notes.herokuapp.com/auth/github'>
								Stay Organized
							</a>
						</div> */}
					</div>
				</div>
			</div>
		</Styles>
	);
};

// const BackSpan = styled.span`
//   display: flex;
//   justify-content: flex-end;
//   border-bottom: 100px solid #0c3c78;
//   border-left: 50px solid transparent;
//   width: 50px;
// `;
const Styles = styled.div`
	p {
		font-size: 1.8rem;
	}
	.title {
		font-size: 4rem;
	}
	.heroWrapper {
		max-width: 600px;
		width: 100%;
		margin-left: 20px;
	}
	.mainContent {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin-top: 10%;
		@media (max-width: 920px) {
			flex-direction: column;
		}
	}
	.wrapper {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
	}
	.background {
		z-index: -1;
		height: 100vh;
		width: 100vw;
		background-color: #0c3c78;
		-webkit-clip-path: polygon(100% 60%, 30% 100%, 100% 100%);
		clip-path: polygon(100% 60%, 30% 100%, 100% 100%);
	}
	.mainContentRight {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 70px;
		font-weight: 15px;
		margin-left: 7%;
		font-family: 'Lato', sans-serif;
		@media (max-width: 920px) {
			margin-top: 50px;
			margin-left: 0;
		}
	}

	.mainLoginButton {
		/* max-width: 300px;
    width: 100%; */
		padding: 15px 20px;
		text-align: center;
		/* border: 6px solid #f0f4f7; */
		border-radius: 4px;
		cursor: pointer;
		background-color: rgb(214, 10, 43);
		font-size: 2.8rem;
		/* font-weight: bold; */
		margin-top: 15px;
	}
	.mainContent .mainContentRight .mainLoginButton a {
		text-decoration: none;
		color: rgb(255, 255, 255);
	}
	.mainImage {
		max-width: 600px;
		width: 100%;
		height: auto;
		margin-bottom: 10px;
		box-shadow: 1px 3px 5px gray;
	}
	.logo {
		width: auto;
		height: 50px;
	}

	height: 100vh;
	/* span {
    height: 100vh;
    border-bottom: 990px solid #0c3c78;
    border-left: 1000px solid transparent;
    padding-top: 100px;
    margin-left: 47.7%;
  } */
	.TopMain {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 20px;
		width: 100%;
	}
	.LoginButton {
		padding: 5px 10px;
		text-align: center;
		/* border: 6px solid #f0f4f7; */
		border-radius: 4px;
		cursor: pointer;
		background-color: rgb(214, 10, 43);
		font-size: 2.5rem;
		font-weight: bold;
	}
	.TopMain .LoginButton a {
		text-decoration: none;
		color: rgb(255, 255, 255);
	}
`;

export default Landing;
