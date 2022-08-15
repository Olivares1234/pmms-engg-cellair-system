import React from 'react';
import { Modal } from 'antd';

const ItemAttachmentFile = React.lazy(() => import('./ItemAttachmentFiles'));

const ItemAttachmentModal = props => {
  const {
    visible,
    data,
    addAttachment,
    deleteAttachment,
    closeModal,
    setLoading
  } = props;

  return (
    <Modal
      visible={visible}
      title={data.code.toUpperCase() + ' ATTACHMENTS'}
      onCancel={closeModal}
      footer={null}
    >
      {visible &&
        <ItemAttachmentFile
          data={data}
          addAttachment={addAttachment}
          deleteAttachment={deleteAttachment}
          setLoading={setLoading}
        />}
    </Modal>
  )
}

export default ItemAttachmentModal
