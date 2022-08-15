import decode from 'jwt-decode';
import axios from 'axios';
import { API } from './config';

export const getToken = () => localStorage.getItem('token');

export const setToken = (token) => localStorage.setItem('token', token);

export const headers = () => {
	const headers = {
		headers: {
			Authorization: 'Bearer ' + getToken(),
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	};
	return headers;
};

export const decodedToken = () => {
	const token = getToken();

	if (!token) return {};

	const decoded = decode(token);
	return decoded;
};

export const isLoggedIn = () => {
	const token = getToken();
	if (!!token) {
		if (isExpired(token)) return false;
		else {
			return true;
		}
	} else {
		return false;
	}
};

export const isExpired = (token) => {
	try {
		const decoded = decode(token);
		if (decoded.exp < Date.now() / 1000) return true;
		else return false;
	} catch (err) {
		return false;
	}
};

export const logout = (shouldRedirect = false) => {
	const token = getToken();
	if (shouldRedirect) {
		window.location.href = '/';
	} else {
		axios.post(API + 'logout/pmms?token=' + token);
	}

	localStorage.removeItem('token');
};
