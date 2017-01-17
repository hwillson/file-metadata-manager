import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Table, Tr, Td } from 'reactable';

import FilePath from './FilePath';
import currentDirectoryListing from '../../../api/files/methods';

class Files extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDirectory: '',
      files: [],
    };
    this.setCurrentDirectory = this.setCurrentDirectory.bind(this);
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
      <Row className="files">
        <Col md={12}>
          <div className="card">
            <div className="header">
              <h4 className="title">
                Directory: <FilePath
                  path={this.state.currentDirectory}
                  setCurrentDirectory={this.setCurrentDirectory}
                />
              </h4>
            </div>
            <div className="files">
              <Table className="table">
                {this.renderRows()}
              </Table>
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}

export default Files;
