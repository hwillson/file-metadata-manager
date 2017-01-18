import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { css } from 'aphrodite';

import UtilityStyles from '../styles/utility';
import Categories from '../components/categories/Categories';
import NewCategoryModal from '../components/categories/NewCategoryModal';

class CategoriesPage extends Component {
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
      <div className="categories-page">
        <Row>
          <Col md={8}>
            <h4 className="title">
              Categories
            </h4>
          </Col>
          <Col md={4} className="text-right">
            <Button
              bsStyle="info"
              className="btn-fill"
              onClick={this.openModal}
            >
              <i className="fa fa-plus" /> New Category
            </Button>
          </Col>
        </Row>
        <Row className={css(UtilityStyles.marginTop20)}>
          <Col md={12}>
            <Categories
              categoriesReady={this.props.categoriesReady}
              categories={this.props.categories}
            />
          </Col>
        </Row>

        <NewCategoryModal
          showModal={this.state.showModal}
          closeModal={this.closeModal}
        />
      </div>
    );
  }
}

CategoriesPage.propTypes = {
  categoriesReady: React.PropTypes.bool.isRequired,
  categories: React.PropTypes.array.isRequired,
};

CategoriesPage.defaultProps = {
  categoriesReady: false,
  categories: [],
};

export default CategoriesPage;
