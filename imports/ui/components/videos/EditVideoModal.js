import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { css } from 'aphrodite';
import AutoForm from 'uniforms-bootstrap3/AutoForm';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { _ } from 'meteor/underscore';

import UtilityStyles from '../../styles/utility';
import { videoSchema } from '../../../api/videos/schemas';
import { updateVideo } from '../../../api/videos/methods';

const EditVideoModal = ({
  showModal,
  closeModal,
  metadataSchema,
  video,
}) => {
  let formRef;
  const combinedVideoSchema = new SimpleSchema([videoSchema, metadataSchema]);

  const callUpdateVideo = (updatedVideo) => {
    const videoData = _.omit(updatedVideo, ['_id']);
    updateVideo.call({ videoId: updatedVideo._id, videoData }, (error) => {
      if (!error) {
        closeModal();
      }
    });
  };

  return (
    <Modal show={showModal} onHide={closeModal} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>
          <span className={css(UtilityStyles.marginRight10)}>
            <i className="fa fa-youtube" />
          </span>
          Edit Video
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AutoForm
          schema={combinedVideoSchema}
          showInlineError
          ref={(ref) => { formRef = ref; }}
          onSubmit={(updatedVideo) => { callUpdateVideo(updatedVideo); }}
          submitField={() => null}
          errorsField={() => null}
          model={video}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn-fill" onClick={closeModal}>Cancel</Button>
        <Button
          bsStyle="info"
          className="btn-fill"
          onClick={() => formRef.submit()}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

EditVideoModal.propTypes = {
  showModal: React.PropTypes.bool.isRequired,
  closeModal: React.PropTypes.func.isRequired,
  metadataSchema: React.PropTypes.object.isRequired,
  video: React.PropTypes.object,
};

EditVideoModal.defaultProps = {
  showModal: false,
  video: null,
};

export default EditVideoModal;
