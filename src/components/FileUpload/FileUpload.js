import React, { Fragment, createRef } from 'react';
import { Button, Alert } from 'antd';
import PropTypes from 'prop-types';

const FileUpload = props => {
  const fileRef = createRef();
  const {
    onRemoveFile,
    onChangeFile,
    file,
    accept,
    multiple,
    title,
    name
  } = props;
  return (
    <Fragment>
      <input
        type="file"
        style={{ display: 'none' }}
        value={[]}
        ref={fileRef}
        accept={accept}
        name={name}
        multiple={multiple ? multiple : false}
        onChange={onChangeFile}
      />
      {file
        ? <Alert
          style={{ margin: '5px 0 5px 0' }}
          type="info"
          message={file.name}
          closeText="Remove file"
          onClose={() => onRemoveFile(name)}
          closable
        />
        : <Button
          style={{ margin: '5px 5px 5px 0' }}
          icon="upload"
          onClick={() => fileRef.current.click()}
        >
          {title ? title : 'Upload Attachment'}
        </Button>
      }


    </Fragment>
  )
}

FileUpload.propTypes = {
  onRemoveFile: PropTypes.func.isRequired,
  onChangeFile: PropTypes.func.isRequired,
  accept: PropTypes.string,
  file: PropTypes.object,
  title: PropTypes.string,
  name: PropTypes.string.isRequired,
  multiple: PropTypes.bool,
}

export default FileUpload
