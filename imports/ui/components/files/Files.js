import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Table, Tr, Td } from 'reactable';
import { css } from 'aphrodite';

import FilePath from './FilePath';
import NewDirectoryModal from './NewDirectoryModal';
import EditFileModal from './EditFileModal';
import FileLink from './FileLink';
import DirectoryLink from './DirectoryLink';
import currentDirectoryListing from '../../../api/fs_files/methods';
import UtilityStyles from '../../styles/utility';

class Files extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDirectory: '',
      fsFiles: [],
      showNewDirectoryModal: false,
      showFileMetadataModal: false,
      selectedFsFile: null,
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
    }, (error, fsFiles) => {
      if (fsFiles) {
        this.setState({ fsFiles });
      }
    });
  }

  openNewDirectoryModal() {
    this.setState({ showNewDirectoryModal: true });
  }

  openFileMetadataModal(event, selectedFsFile) {
    event.preventDefault();
    this.props.selectedUid.set(selectedFsFile.uid);
    this.setState({
      showFileMetadataModal: true,
      selectedFsFile,
    });
  }

  closeNewDirectoryModal() {
    this.setState({ showNewDirectoryModal: false });
  }

  closeFileMetadataModal() {
    this.props.selectedUid.set(null);
    this.setState({
      showFileMetadataModal: false,
      selectedFsFile: null,
    });
  }

  renderRows() {
    const content = [];
    const currentDirectory = this.state.currentDirectory;
    this.state.fsFiles.forEach((fsFile) => {
      let link;
      if (fsFile.type === 'directory') {
        link = (
          <DirectoryLink
            key={fsFile.name}
            fsFile={fsFile}
            currentDirectory={currentDirectory}
            setCurrentDirectory={this.setCurrentDirectory}
          />
        );
      } else {
        link = (
          <FileLink
            key={fsFile.name}
            fsFile={fsFile}
            openFileMetadataModal={this.openFileMetadataModal}
          />
        );
      }
      content.push(
        <Tr key={fsFile.name}>
          <Td column="Name">
            {link}
          </Td>
          <Td column="Last Modified" data={fsFile.lastModifiedTimestamp} />
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
        <EditFileModal
          showModal={this.state.showFileMetadataModal}
          closeModal={this.closeFileMetadataModal}
          metadataSchema={this.props.metadataSchema}
          file={this.props.file}
          fsFile={this.state.selectedFsFile}
          currentDirectory={this.state.currentDirectory}
        />
      </div>
    );
  }
}

Files.propTypes = {
  metadataSchema: React.PropTypes.object.isRequired,
  file: React.PropTypes.object.isRequired,
  selectedUid: React.PropTypes.object.isRequired,
};

export default Files;
