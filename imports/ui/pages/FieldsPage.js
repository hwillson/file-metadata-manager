import React from 'react';
import { Row, Col } from 'react-bootstrap';

import Fields from '../components/fields/Fields';
import NewFieldForm from '../components/fields/NewFieldForm';

const FieldsPage = ({ fieldsReady, fields }) => (
  <div className="fields-page">
    <Row>
      <Col md={12}>
        <h4 className="title">
          Fields
        </h4>
      </Col>
    </Row>
    <Row>
      <Col md={12}>
        <Fields fieldsReady={fieldsReady} fields={fields} />
        <NewFieldForm />
      </Col>
    </Row>
  </div>
);

FieldsPage.propTypes = {
  fieldsReady: React.PropTypes.bool.isRequired,
  fields: React.PropTypes.array.isRequired,
};

export default FieldsPage;
