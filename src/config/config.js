import { lazy } from 'react';
const ProductListView = lazy(() => import('../views/ProductListView'));
const LogsView = lazy(() => import('../views/LogsView'));

export const brandname_lg = { name: 'PM', suffix: 'MS' }; //BRANDNAME TO BE DISPLAY WHEN ON LG MODE,MAX OF 10 CHARACTERS FOR NAME AND 5 FOR SUFFIX
export const brandname_sm = 'PMMS'; //SHORTER NAME or acronym for BRANDNAME TO BE DISPLAY WHEN ON MOBILE SIZE, MAX OF 8 CHARACTERS ONLY
export const redirect_path = '/home'; //redirect path if successfully logged in
export const API = process.env.REACT_APP_API_URL; //api link

//https://ant.design/components/icon/ for icons
export const routes = [
	//array for routes
	{
		component: ProductListView,
		title: 'product items',
		icon: 'list-ol',
		view: true, //change to false if you dont want this route to be on sidebar menu
		path: '/home',
	},
	{
		component: LogsView,
		title: 'logs',
		icon: 'history',
		view: true, //change to false if you dont want this route to be on sidebar menu
		path: '/logs',
	},
];
