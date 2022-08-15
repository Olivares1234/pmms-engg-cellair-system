import React, { Fragment, useState } from 'react';
import { Divider } from 'antd';
import FileUpload from '../FileUpload/FileUpload';

const ItemAttachmentFiles = props => {
  const { data, addAttachment, deleteAttachment, setLoading } = props;
  const { dwg, bom, costing, id } = data;

  const defaultVal = {};

  if (dwg)
    defaultVal.dwg = { name: dwg };
  if (bom)
    defaultVal.bom = { name: bom };
  if (costing)
    defaultVal.costing = { name: costing };

  const [attachments, setAttachments] = useState(defaultVal);
  const onChangeFile = (e) => {
    const type = e.target.name;
    const values = {
      item_id: id,
      type,
      [e.target.name]: e.target.files[0]
    }
    const name = e.target.files[0].name;
    addAttachment(values, setLoading)
      .then(() => setAttachments({
        ...attachments,
        [type]: {
          name
        }
      })
      )


  }

  const onRemoveFile = (name) => {

    const newAttachments = { ...attachments };
    delete newAttachments[name];

    deleteAttachment(id, name, setLoading)
      .then(() => setAttachments({
        ...newAttachments
      })
      )
  }

  return (
    <div>
      <Fragment >
        <Divider orientation="left">Attachments</Divider>
        <div>
          <FileUpload
            onChangeFile={onChangeFile}
            file={attachments.dwg ? attachments.dwg : null}
            onRemoveFile={onRemoveFile}
            accept="application/pdf"
            multiple={false}
            title="Upload dwg"
            name="dwg"
          />
        </div>
        <div>
          <FileUpload
            onChangeFile={onChangeFile}
            file={attachments.bom ? attachments.bom : null}
            onRemoveFile={onRemoveFile}
            accept="application/pdf"
            multiple={false}
            title="Upload bom"
            name="bom"
          />
        </div>
        <div>
          <FileUpload
            onChangeFile={onChangeFile}
            file={attachments.costing ? attachments.costing : null}
            onRemoveFile={onRemoveFile}
            accept="application/pdf"
            multiple={false}
            title="Upload costing"
            name="costing"
          />
        </div>
      </Fragment>
    </div>
  )
}

export default ItemAttachmentFiles
