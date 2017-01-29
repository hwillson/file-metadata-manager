import React, { Component } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import { css } from 'aphrodite';
import AutoForm from 'uniforms-bootstrap3/AutoForm';

import { videoIdSchema } from '../../../api/videos/schemas';
import { createVideoRecord } from '../../../api/videos/methods';
import UtilityStyles from '../../styles/utility';

class NewVideoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creatingVideo: false,
      videoError: null,
    };
    this.closeModal = this.closeModal.bind(this);
    this.formRef = null;
  }

  closeModal() {
    this.setState({
      videoError: null,
    });
    this.props.closeModal();
  }

  callCreateVideoRecord(videoData) {
    this.setState({ creatingVideo: true });
    createVideoRecord.call({ uid: videoData.uid }, (error, done) => {
      if (error) {
        this.setState({
          creatingVideo: false,
          videoError: error.error,
        });
      } else if (done) {
        this.setState({
          creatingVideo: false,
        });
        this.closeModal();
      }
    });
  }

  showVideoErrors() {
    return this.state.videoError
      ? <Alert bsStyle="danger">{this.state.videoError}</Alert> : null;
  }

  saveButton() {
    let button;
    if (this.state.creatingVideo) {
      button = (
        <Button
          bsStyle="info"
          className="btn-fill"
          disabled
        >
          Saving...
        </Button>
      );
    } else {
      button = (
        <Button
          bsStyle="info"
          className="btn-fill"
          onClick={() => this.formRef.submit()}
        >
          Save
        </Button>
      );
    }
    return button;
  }

  render() {
    return (
      <Modal
        show={this.props.showModal}
        onHide={this.closeModal}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <span className={css(UtilityStyles.marginRight10)}>
              <i className="fa fa-youtube" />
            </span>
            New Video
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.showVideoErrors()}
          <AutoForm
            schema={videoIdSchema}
            showInlineError
            ref={(ref) => { this.formRef = ref; }}
            onSubmit={(videoData) => { this.callCreateVideoRecord(videoData); }}
            submitField={() => null}
            errorsField={() => null}
          />
          <p>
            The video ID can be found in a YouTube video link. For example:
            https://www.youtube.com/watch?v=<strong>pK-J1pJW1AQ</strong>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-fill" onClick={this.closeModal}>
            Cancel
          </Button>
          {this.saveButton()}
        </Modal.Footer>
      </Modal>
    );
  }
}

NewVideoModal.propTypes = {
  showModal: React.PropTypes.bool.isRequired,
  closeModal: React.PropTypes.func.isRequired,
};

NewVideoModal.defaultProps = {
  showModal: false,
};

export default NewVideoModal;
