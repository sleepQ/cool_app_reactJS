import React from 'react';
import { invalidFileExtension, invalidFileSize, composeAttachment } from '../../utils/helper_functions';
import ErrorMessage from '../../shared_components/ErrorMessage';

class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      error: '',
    };
    this.controller = new AbortController();

    this.onFileUpdate = this.onFileUpdate.bind(this);
  }

  componentWillUnmount() {
    this.controller.abort();
  }

  onFileUpdate() {
    const { upload, id = '', setUser } = this.props;
    const attachment = document.getElementById(id);
    const fileArr = Object.values(attachment.files);

    const invalidImgExt = invalidFileExtension(fileArr);
    const invalidImgSize = invalidFileSize(fileArr);

    if (invalidImgExt) {
      this.setState(() => ({ error: `The file extension of ${invalidImgExt.name} is invalid` }));
    } else if (invalidImgSize) {
      this.setState(() => ({ error: `The file size of ${invalidImgSize.name} can not exceed 5mb` }));
    } else {
      const form = composeAttachment(attachment);

      this.setState(() => ({ spinner: true }));

      upload(form, this.controller.signal).then(res => {
        if (res.ok) {
          setUser({ ...res.user });
          this.setState(() => ({ spinner: false, error: '' }));
        } else {
          const { message, name } = res.error || {};
          if (name === 'AbortError') return;

          this.setState(() => ({ spinner: false, error: message }));
        }
      });
    }
  }

  render() {
    const { error, spinner } = this.state;
    const { multiple = false, id = '', label = '' } = this.props;

    return (
      <div>
        <div className="col-md-4 my-2">
          <input
            type="file"
            className="custom-file-input"
            id={id}
            onChange={this.onFileUpdate}
            multiple={multiple}
            disabled={spinner}
          />
          <label className="custom-file-label" htmlFor={id}>
            {label} {' '}
            {spinner && <span className="spinner-border spinner-border-sm" aria-hidden="true" />}
          </label>

        </div>

        <ErrorMessage error={error} />

      </div>
    )
  }
}

export default FileUpload;
