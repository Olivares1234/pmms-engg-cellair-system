import React from 'react';
import { Table } from 'antd';

const MaterialPublicTable = (props) => {
	const { itemList } = props;
	const columns = [
		{
			key: 'epcode',
			title: 'CODE',
			dataIndex: 'code',
			sorter: (a, b) => a.code.localeCompare(b.code),
			sortDirections: ['ascend', 'descend'],
		},
		{
			key: 'mspecs',
			title: 'MATERIAL SPECIFICATION',
			dataIndex: 'mspecs',
			sorter: (a, b) => a.mspecs.localeCompare(b.mspecs),
			sortDirections: ['ascend', 'descend'],
		},
		{
			key: 'itemdesc',
			title: 'ITEM DESCRIPTION',
			dataIndex: 'itemdesc',
			sorter: (a, b) => a.itemdesc.localeCompare(b.itemdesc),
			sortDirections: ['ascend', 'descend'],
		},
		{
			key: 'partnum',
			title: 'PART NO.',
			dataIndex: 'partnum',
			sorter: (a, b) => a.partnum.localeCompare(b.partnum),
			sortDirections: ['ascend', 'descend'],
		},
		{
			key: 'requiredqty',
			title: 'REQUIRED QTY',
			dataIndex: 'requiredqty',
		},
		{
			key: 'outs',
			title: 'OUTS',
			dataIndex: 'outs',
		},
		{
			key: 'customer_label',
			title: 'CUSTOMER',
			dataIndex: 'customer_label',
			sorter: (a, b) => a.customer_label.localeCompare(b.customer_label),
			sortDirections: ['ascend', 'descend'],
		},
		{
			key: 'remarks',
			title: 'REMARKS',
			dataIndex: 'remarks',
		},
	];

	return (
		<Table
			columns={columns}
			dataSource={itemList}
			bordered={true}
			size="middle"
			bodyStyle={{ overflowX: 'auto' }}
			style={{ margin: '10px 0 10px 0' }}
			pagination={{
				pageSizeOptions: ['10', '25', '50', '100', '500'],
				showSizeChanger: true,
				showTotal: (total, range) =>
					`Showing ${range[0]}-${range[1]} of ${total} items`,
			}}
			rowKey="id"
		/>
	);
};

export default MaterialPublicTable;
