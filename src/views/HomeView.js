import React, { useEffect, useState, useContext } from 'react';
import { Input, Icon, Dropdown, Menu } from 'antd';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { MContext } from '../context/MasterlistContext';
import { Utils } from '../context/UtilsContext';
import { decodedToken, logout, isLoggedIn } from '../config/token';
import MaterialPublicTable from '../components/Materials/MaterialPublicTable';

const SideMenu = styled.nav`
	display: flex;
	width: 100%;
	justify-content: flex-end;
	align-items: center;
`;

const Username = styled.span`
	margin: 0 10px;
	font-size: 16px;
	text-transform: uppercase;
`;

const HomeView = () => {
	const { getItems, masterlist } = useContext(MContext);
	const { setLoading } = useContext(Utils);
	const [search, setSearch] = useState('');
	const [isLogOutClicked, setLogOut] = useState(false);

	const menu = (
		<Menu>
			<Menu.Item key="0">
				<span onClick={() => setLogOut(true)}>Log out</span>
			</Menu.Item>
		</Menu>
	);

	const { itemList } = masterlist;
	const filteredItemList = itemList.filter((data) => {
		return (
			data.mspecs.toUpperCase().indexOf(search.toUpperCase()) !== -1 ||
			data.itemdesc.toUpperCase().indexOf(search.toUpperCase()) !== -1 ||
			data.partnum.toUpperCase().indexOf(search.toUpperCase()) !== -1 ||
			data.code.toUpperCase().indexOf(search.toUpperCase()) !== -1 ||
			data.customer_label.toUpperCase().indexOf(search.toUpperCase()) !== -1 ||
			data.attachment.toUpperCase().indexOf(search.toUpperCase()) !== -1
		);
	});

	useEffect(() => getItems(setLoading), []);
	const { username, access } = decodedToken();

	if (isLogOutClicked || !isLoggedIn()) {
		logout();
		return <Redirect to="/" />;
	}

	if (
		isLoggedIn() &&
		access &&
		Object.prototype.hasOwnProperty.call(access, 'pmms')
	)
		return <Redirect to="/home" />;

	return (
		<div style={style.wrapper}>
			<SideMenu>
				<Username>{username}</Username>
				<Dropdown overlay={menu} trigger={['click']}>
					<Icon type="down" />
				</Dropdown>
			</SideMenu>
			<Input
				placeholder="Search"
				onChange={(e) => setSearch(e.target.value)}
				value={search}
				style={{
					width: '100%',
					maxWidth: '35rem',
					margin: '5px 0 5px 0',
				}}
				suffix={<Icon type="search" />}
			/>

			<MaterialPublicTable
				itemList={filteredItemList}
				setLoading={setLoading}
			/>
		</div>
	);
};

const style = {
	wrapper: {
		padding: 10,
		width: '95%',
		margin: '0 auto',
		backgroundColor: '#f8feff',
		borderRadius: 4,
	},
};

export default HomeView;
