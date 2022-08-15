import React, { lazy } from 'react';
import { Modal } from 'antd';

const MasterlistForm = lazy(() => import('./MasterlistForm'));

const MasterlistModal = props => {

  const {
    visible,
    closeModal,
    data,
    userType
  } = props;
  return (
    <Modal
      style={{ top: 10 }}
      visible={visible}
      title="Item details"
      footer={null}
      onCancel={closeModal}
      width="65%"
    >
      {visible &&
        <MasterlistForm
          data={data}
          userType={userType}
        />}
    </Modal>
  )
}

export default MasterlistModal
