import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Table, Tr, Td } from 'reactable';
import { css } from 'aphrodite';

import FilePath from './FilePath';
import NewDirectoryModal from './NewDirectoryModal';
import FileMetadataModal from './FileMetadataModal';
import FileLink from './FileLink';
import DirectoryLink from './DirectoryLink';
import currentDirectoryListing from '../../../api/files/methods';
import UtilityStyles from '../../styles/utility';

class Files extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDirectory: '',
      files: [],
      showNewDirectoryModal: false,
      showFileMetataModal: false,
    };
    this.setCurrentDirectory = this.setCurrentDirectory.bind(this);
    this.openNewDirectoryModal = this.openNewDirectoryModal.bind(this);
    this.openFileMetadataModal = this.openFileMetadataModal.bind(this);
    this.closeNewDirectoryModal = this.closeNewDirectoryModal.bind(this);
    this.closeFileMetadataModal = this.closeFileMetadataModal.bind(this);
  }

  componentDidMount() {
    this.showDirectory();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentDirectory !== this.state.currentDirectory) {
      this.showDirectory();
    }
  }

  setCurrentDirectory(event) {
    event.preventDefault();
    const pathMatches = event.target.closest('a').href.match(/^(.*)\/files(.*)$/);
    if (pathMatches.length === 3) {
      this.setState({ currentDirectory: pathMatches[2] });
    } else {
      this.setState({ currentDirectory: '' });
    }
  }

  showDirectory() {
    currentDirectoryListing.call({
      currentDirectory: decodeURIComponent(this.state.currentDirectory),
    }, (error, files) => {
      if (files) {
        this.setState({ files });
      }
    });
  }

  openNewDirectoryModal() {
    this.setState({ showNewDirectoryModal: true });
  }

  openFileMetadataModal(event) {
    event.preventDefault();
    this.setState({ showFileMetataModal: true });
  }

  closeNewDirectoryModal() {
    this.setState({ showNewDirectoryModal: false });
  }

  closeFileMetadataModal() {
    this.setState({ showFileMetataModal: false });
  }

  renderRows() {
    const content = [];
    const currentDirectory = this.state.currentDirectory;
    this.state.files.forEach((file) => {
      let link;
      if (file.type === 'directory') {
        link = (
          <DirectoryLink
            key={file.name}
            file={file}
            currentDirectory={currentDirectory}
            setCurrentDirectory={this.setCurrentDirectory}
          />
        );
      } else {
        link = (
          <FileLink
            key={file.name}
            file={file}
            openFileMetadataModal={this.openFileMetadataModal}
          />
        );
      }
      content.push(
        <Tr key={file.name}>
          <Td column="Name">
            {link}
          </Td>
          <Td column="Last Modified" data={file.lastModifiedTimestamp} />
          <Td column="Action">
            TODO
          </Td>
        </Tr>,
      );
    });
    return content;
  }

  render() {
    return (
      <div className="files">
        <Row className="header">
          <Col md={8}>
            <h4 className="title">
              Directory: <FilePath
                path={this.state.currentDirectory}
                setCurrentDirectory={this.setCurrentDirectory}
              />
            </h4>
          </Col>
          <Col md={4} className="text-right">
            <Button
              bsStyle="info"
              className={`btn-fill ${css(UtilityStyles.marginRight10)}`}
              onClick={this.openNewDirectoryModal}
            >
              <i className="fa fa-plus" /> New Directory
            </Button>
            <Button bsStyle="info" className="btn-fill">
              <i className="fa fa-plus-circle" /> New File
            </Button>
          </Col>
        </Row>
        <Row className={css(UtilityStyles.marginTop20)}>
          <Col md={12}>
            <Table className="table">
              {this.renderRows()}
            </Table>
          </Col>
        </Row>

        <NewDirectoryModal
          showModal={this.state.showNewDirectoryModal}
          closeModal={this.closeNewDirectoryModal}
          currentPath={this.state.currentDirectory}
        />
        <FileMetadataModal
          showModal={this.state.showFileMetataModal}
          closeModal={this.closeFileMetadataModal}
          fields={this.props.fields}
          categories={this.props.categories}
          categoryValues={this.props.categoryValues}
        />
      </div>
    );
  }
}

Files.propTypes = {
  fields: React.PropTypes.array.isRequired,
  categories: React.PropTypes.array.isRequired,
  categoryValues: React.PropTypes.array.isRequired,
};

export default Files;
