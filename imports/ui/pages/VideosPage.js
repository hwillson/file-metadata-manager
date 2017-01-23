import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';

import VideosTable from '../components/videos/VideosTable';
import NewVideoModal from '../components/videos/NewVideoModal';

class VideosPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <div className="videos-page">
        <Row>
          <Col md={8}>
            <h4 className="title">
              YouTube Videos
            </h4>
          </Col>
          <Col md={4} className="text-right">
            <Button
              bsStyle="info"
              className="btn-fill"
              onClick={this.openModal}
            >
              <i className="fa fa-plus" /> New Video
            </Button>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <VideosTable
              videosReady={this.props.videosReady}
              videos={this.props.videos}
            />
          </Col>
        </Row>

        <NewVideoModal
          showModal={this.state.showModal}
          closeModal={this.closeModal}
        />
      </div>
    );
  }
}

VideosPage.propTypes = {
  videosReady: React.PropTypes.bool.isRequired,
  videos: React.PropTypes.array.isRequired,
};

export default VideosPage;
