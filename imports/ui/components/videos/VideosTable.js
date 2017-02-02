/* global window, confirm */

import React, { Component } from 'react';
import { _ } from 'meteor/underscore';
import { Table, Tr, Td } from 'reactable';
import { Button } from 'react-bootstrap';
import { css } from 'aphrodite';

import Loading from '../loading/Loading';
import UtilityStyles from '../../styles/utility';
import EditVideoModal from './EditVideoModal';
import { deleteVideo } from '../../../api/videos/methods';

class VideosTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      selectedVideo: null,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.callRemoveVideo = this.callRemoveVideo.bind(this);
  }

  openModal(event, video) {
    event.preventDefault();
    this.setState({
      selectedVideo: video,
      showModal: true,
    });
  }

  closeModal() {
    this.setState({
      showModal: false,
      selectedVideo: null,
    });
  }

  callRemoveVideo(videoId) {
    if (confirm(
        'Are you sure you want to remove this video? All metadata will be '
        + 'removed (but the original video on YouTube will stay in place).')) {
      deleteVideo.call({ videoId });
    }
  }

  renderRows() {
    return this.props.videos.map(video => (
      <Tr key={video.uid}>
        <Td column="Title">
          <a href="#edit" onClick={(event) => { this.openModal(event, video); }}>
            {video.title}
          </a>
        </Td>
        <Td column="Description" data={video.description} />
        <Td column="Published Date" data={video.datePublished} />
        <Td column="Action">
          <div>
            <Button
              bsStyle="default"
              className={`btn-fill ${css(UtilityStyles.marginRight5)}`}
              onClick={() => {
                window.open(`https://www.youtube.com/watch?v=${video.uid}`);
              }}
              bsSize="xsmall"
            >
              <i className="fa fa-external-link" />
              Open Video
            </Button>
            <Button
              bsStyle="danger"
              className="btn-fill"
              onClick={() => { this.callRemoveVideo(video._id); }}
              bsSize="xsmall"
            >
              <i className="fa fa-minus-circle" />
              Remove
            </Button>
          </div>
        </Td>
      </Tr>
    ));
  }

  render() {
    let content;
    if (!this.props.videosReady) {
      content = <Loading />;
    } else if (this.props.videosReady && _.isEmpty(this.props.videos)) {
      content = <p>No videos found.</p>;
    } else {
      content = (
        <Table className="table">
          {this.renderRows()}
        </Table>
      );
    }
    return (
      <div className="videos-table">
        {content}
        <EditVideoModal
          showModal={this.state.showModal}
          closeModal={this.closeModal}
          metadataSchema={this.props.metadataSchema}
          video={this.state.selectedVideo}
        />
      </div>
    );
  }
}

VideosTable.propTypes = {
  videosReady: React.PropTypes.bool.isRequired,
  videos: React.PropTypes.array.isRequired,
  metadataSchema: React.PropTypes.object.isRequired,
};

export default VideosTable;
