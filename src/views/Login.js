import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Redirect } from 'react-router-dom';

import { isLoggedIn, decodedToken } from '../config/token';
import LoginForm from '../components/Login/LoginForm';

const Wrapper = styled.section`
	width: 100%;
	max-width: 500px;
	margin: 4rem auto;
	background-color: #50abe9;
	padding: 30px;
	border-radius: 7px;

	& p {
		text-align: center;
		margin-top: 25px;
		color: #fff;
		font-weight: 600;
	}
`;

const Login = () => {
	const { access } = decodedToken;
	const [loginData, setLoginData] = useState({
		isLoggedIn: false,
		redirectPath:
			isLoggedIn() &&
			access &&
			Object.prototype.hasOwnProperty.call(access, 'pmms')
				? '/home'
				: '/masterlist',
	});

	if (isLoggedIn() || loginData.isLoggedIn)
		return <Redirect to={loginData.redirectPath} />;

	return (
		<Wrapper>
			<LoginForm setLoginData={setLoginData} />
			<p>
				{process.env.REACT_APP_PROJECT_NAME} &copy; {moment().format('YYYY')}
			</p>
		</Wrapper>
	);
};

export default Login;
