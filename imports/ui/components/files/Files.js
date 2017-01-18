import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Table, Tr, Td } from 'reactable';
import { css } from 'aphrodite';

import FilePath from './FilePath';
import NewDirectoryModal from './NewDirectoryModal';
import currentDirectoryListing from '../../../api/files/methods';
import UtilityStyles from '../../styles/utility';

class Files extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDirectory: '',
      files: [],
      showModal: false,
    };
    this.setCurrentDirectory = this.setCurrentDirectory.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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

  openModal() {
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  renderRows() {
    const content = [];
    const currentDirectory = this.state.currentDirectory;
    this.state.files.forEach((file) => {
      const name = `${(file.type === 'file') ? 'file/' : ''}${file.name}`;
      const folder =
        (file.type === 'directory') ? <i className="fa fa-folder-o" /> : null;
      content.push((
        <Tr key={file.name}>
          <Td column="Name">
            <div>
              {folder}
              <a
                href={`/files${currentDirectory}/${name}`}
                onClick={this.setCurrentDirectory}
              >
                {file.name}
              </a>
            </div>
          </Td>
          <Td column="Last Modified" data={file.lastModifiedTimestamp} />
          <Td column="Action">
            TODO
          </Td>
        </Tr>
      ));
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
              onClick={this.openModal}
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
          showModal={this.state.showModal}
          closeModal={this.closeModal}
        />
      </div>
    );
  }
}

export default Files;
