import React, { lazy, Fragment, useEffect, useState, useContext } from 'react';
import { MContext } from '../context/MasterlistContext';
import { Utils } from '../context/UtilsContext';
import Layout from '../layout/Layout';

import { Button, Input, Icon, Tooltip } from 'antd';

const MaterialAdminTable = lazy(() => import('../components/Materials/MaterialAdminTable'));
const MasterlistModal = lazy(() => import('../components/Materials/MasterlistModal'));
const ItemAttachmentModal = lazy(() => import('../components/Attachment/ItemAttachmentModal'));

const ProductListView = ({ userType }) => {

  const {
    getItems,
    deleteItem,
    downloadAttachment,
    addAttachment,
    deleteAttachment,
    exportCsv,
    masterlist } = useContext(MContext);
  const { setLoading } = useContext(Utils);
  const [search, setSearch] = useState('');
  const [modalConfig, setModalConfig] = useState({ visible: false });

  useEffect(() => {
    getItems(setLoading);
  }, []);
  const { itemList } = masterlist;
  const { visible } = modalConfig;

  const filteredItemList = itemList.filter(data => {
    return data.mspecs.toUpperCase().indexOf(search.toUpperCase()) !== -1 ||
      data.itemdesc.toUpperCase().indexOf(search.toUpperCase()) !== -1 ||
      data.partnum.toUpperCase().indexOf(search.toUpperCase()) !== -1 ||
      data.code.toUpperCase().indexOf(search.toUpperCase()) !== -1 ||
      data.customer_label.toUpperCase().indexOf(search.toUpperCase()) !== -1 ||
      data.attachment.toUpperCase().indexOf(search.toUpperCase()) !== -1
  });

  const openModal = (data, type) => {
    setModalConfig(
      {
        visible: true,
        data,
        type
      })
  }

  const closeModal = () => {
    setModalConfig({
      visible: false
    })
  }
  
  return (
    <Fragment>
      <br />
      <h2>PRODUCT ITEMS</h2>

      <div style={{
        display: 'flex',
        justifyContent: 'spacebetween',
        width: '100%'
      }}>
        <div style={{ flex: 5 }}>
          <Button
            onClick={() => openModal({}, 'item')}
            icon="form"
            style={{ marginRight: 5 }}
            className="bl-cl">Add Item</Button>

          <Tooltip title="Export to CSV" placement="right"><Button
            onClick={() => exportCsv(setLoading)}
            shape="circle"
            className="bl-cl"
            style={{ marginRight: 5 }}
            icon="file-excel"></Button>
          </Tooltip>

          <Tooltip title="Refresh Content" placement="right">
            <Button
              onClick={() => getItems(setLoading)}
              icon="sync"
              shape="circle"
              tyle={{ marginRight: 5 }}
              className="bl-cl">
            </Button>
          </Tooltip>


        </div>
        <div style={{ flexGrow: 1, textAlign: 'right' }}>
          <Input
            onChange={e => setSearch(e.target.value)}
            placeholder="Search"
            suffix={<Icon type="search" />}
            style={{ width: '100%' }} />
        </div>

      </div>

      {modalConfig.type === 'item' &&
        <MasterlistModal
          visible={visible}
          closeModal={closeModal}
          data={modalConfig.data}
          userType={userType}
        />}

      {modalConfig.type === 'attachment' &&
        <ItemAttachmentModal
          visible={visible}
          closeModal={closeModal}
          data={modalConfig.data}
          userType={userType}
          addAttachment={addAttachment}
          deleteAttachment={deleteAttachment}
          setLoading={setLoading}
        />
      }

      <MaterialAdminTable
        itemList={filteredItemList}
        openModal={openModal}
        deleteItem={deleteItem}
        setLoading={setLoading}
        downloadAttachment={downloadAttachment}
      />
    </Fragment>
  )
}

export default Layout(ProductListView)
