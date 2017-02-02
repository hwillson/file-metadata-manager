import React from 'react';
import AutoField from 'uniforms-bootstrap3/AutoField';

const SchemaFormFields = ({ schema }) => {
  const content = [];
  if (schema) {
    schema._schemaKeys.forEach((key) => {
      if (key.indexOf('$') < 0) {
        content.push(<AutoField key={key} name={key} />);
      }
    });
  }
  return (
    <div className="schema-fields">
      {content}
    </div>
  );
};

SchemaFormFields.propTypes = {
  schema: React.PropTypes.object,
};

SchemaFormFields.defaultProps = {
  schema: null,
};

export default SchemaFormFields;
