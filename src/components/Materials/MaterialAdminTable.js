import React from "react";
import { Table, Icon, Button, Tooltip } from "antd";
import Confirm from "../Confirm";

const MaterialAdminTable = (props) => {
  const { itemList, openModal, deleteItem, setLoading, downloadAttachment } =
    props;

  const columns = [
    {
      key: "attachment",
      render: (data) => (
        <Tooltip title="Manage attachments" placement="right">
          <Button
            onClick={() => openModal(data, "attachment")}
            icon="paper-clip"
            className="bl-cl"
            size="small"
          ></Button>
        </Tooltip>
      ),
    },
    {
      key: "editBtn",
      render: (data) => (
        <Tooltip title="Edit record" placement="right">
          <Button
            onClick={() => openModal({ ...data, origCode: data.code }, "item")}
            icon="edit"
            className="bl-cl"
            size="small"
          ></Button>
        </Tooltip>
      ),
    },
    {
      key: "copyBtn",
      render: (data) => (
        <Tooltip title="Copy record" placement="right">
          <Button
            icon="copy"
            onClick={() =>
              openModal(
                {
                  code: data.code,
                  mspecs: data.mspecs,
                  itemdesc: data.itemdesc,
                  partnum: data.partnum,
                  regisdate: "",
                  effectdate: "",
                  requiredqty: 1,
                  outs: 1,
                  unitprice: null,
                  budgetprice: null,
                  unit: "",
                  supplierprice: "",
                  remarks: "",
                  customer: data.customer.toString(),
                  dwg: null,
                  bom: null,
                  mother: data.code,
                  conversions: data.conversions,
                  costing: null,
                },
                "item"
              )
            }
            className="bl-cl"
            size="small"
          ></Button>
        </Tooltip>
      ),
    },
    {
      key: "deleteBtn",
      render: (data) => (
        <Tooltip title="Delete record" placement="right">
          <Button
            onClick={() => Confirm(deleteItem, null, data.id, setLoading)}
            icon="delete"
            className="red-cl"
            size="small"
          ></Button>
        </Tooltip>
      ),
    },
    {
      key: "customer_label",
      title: "CUSTOMER",
      sorter: (a, b) => a.customer_label.localeCompare(b.customer_label),
      sortDirections: ["ascend", "descend"],
      render: (data) => data.customer_label.toString().toUpperCase(),
    },
    {
      key: "epcode",
      title: "CODE",
      sorter: (a, b) => a.code.localeCompare(b.code),
      sortDirections: ["ascend", "descend"],
      render: (data) => data.code.toString().toUpperCase(),
    },
    {
      key: "mspecs",
      title: "MATERIAL SPECIFICATION",
      sorter: (a, b) => a.mspecs.localeCompare(b.mspecs),
      sortDirections: ["ascend", "descend"],
      render: (data) => data.mspecs.toString().toUpperCase(),
    },
    {
      key: "itemdesc",
      title: "ITEM DESCRIPTION",
      sorter: (a, b) => a.itemdesc.localeCompare(b.itemdesc),
      sortDirections: ["ascend", "descend"],
      render: (data) => data.itemdesc.toString().toUpperCase(),
    },
    {
      key: "partnum",
      title: "PART NO.",
      sorter: (a, b) => a.partnum.localeCompare(b.partnum),
      sortDirections: ["ascend", "descend"],
      render: (data) => data.partnum.toString().toUpperCase(),
    },
    {
      key: "regisdate",
      title: "REGISTER DATE",
      dataIndex: "regisdate",
    },
    {
      key: "effectdate",
      title: "EFFECTIVITY DATE",
      dataIndex: "effectdate",
    },
    {
      key: "unit",
      title: "UNIT",
      dataIndex: "unit",
    },
    {
      key: "unitprice",
      title: "UNIT PRICE",
      dataIndex: "unitprice",
    },
    {
      key: "supplierprice",
      title: "SUPPLIER PRICE",
      dataIndex: "supplierprice",
    },
    {
      key: "budgetprice",
      title: "BUDGET PRICE",
      dataIndex: "budgetprice",
    },
    {
      key: "requiredqty",
      title: "REQUIRED QTY",
      dataIndex: "requiredqty",
    },
    {
      key: "outs",
      title: "OUTS",
      dataIndex: "outs",
    },
    {
      key: "remarks",
      title: "REMARKS",
      dataIndex: "remarks",
    },
    {
      key: "dwg",
      title: "DRAWING",
      render: (data) => {
        return data.dwg ? (
          <Tooltip placement="right" title="View Drawing">
            <Button
              onClick={() => downloadAttachment(data.id, "dwg", setLoading)}
              size="small"
              icon="download"
            ></Button>
          </Tooltip>
        ) : (
          <Icon type="ellipsis" />
        );
      },
      align: "center",
    },
    {
      key: "bom",
      title: "BOM",
      render: (data) => {
        return data.bom ? (
          <Tooltip placement="right" title="View Bom">
            <Button
              onClick={() => downloadAttachment(data.id, "bom", setLoading)}
              size="small"
              icon="download"
            ></Button>
          </Tooltip>
        ) : (
          <Icon type="ellipsis" />
        );
      },
      align: "center",
    },
    {
      key: "costing",
      title: "COSTING",
      render: (data) => {
        return data.costing ? (
          <Tooltip placement="right" title="View Costing">
            <Button
              onClick={() => downloadAttachment(data.id, "costing", setLoading)}
              size="small"
              icon="download"
            ></Button>
          </Tooltip>
        ) : (
          <Icon type="ellipsis" />
        );
      },
      align: "center",
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={itemList}
      bordered={true}
      size="small"
      bodyStyle={{ overflowX: "auto" }}
      style={{ margin: "10px 0 10px 0" }}
      pagination={{
        pageSizeOptions: ["10", "25", "50", "100", "500"],
        showSizeChanger: true,
        showTotal: (total, range) =>
          `Showing ${range[0]}-${range[1]} of ${total} items`,
      }}
      rowKey="id"
    />
  );
};

export default MaterialAdminTable;
