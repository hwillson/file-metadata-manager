import React from 'react';
import { _ } from 'meteor/underscore';
import { css, StyleSheet } from 'aphrodite';

import Loading from '../loading/Loading';
import Field from './Field';
import UtilityStyles from '../../styles/utility';

let styles;

const Fields = ({ fieldsReady, fields }) => {
  let content;
  if (!fieldsReady) {
    content = <Loading />;
  } else if (fieldsReady && _.isEmpty(fields)) {
    content = (
      <p className={css(UtilityStyles.marginTopBottom20)}>No fields found.</p>
    );
  } else {
    content = (
      <ul className={css(styles.ul)}>
        {fields.map(field => <Field key={field._id} field={field} />)}
      </ul>
    );
  }

  return (
    <div className="fields">
      {content}
    </div>
  );
};

Fields.propTypes = {
  fieldsReady: React.PropTypes.bool.isRequired,
  fields: React.PropTypes.array.isRequired,
};

styles = StyleSheet.create({
  ul: {
    listStyle: 'none',
    border: '1px solid #ddd',
    padding: 0,
    margin: '20px 0',
  },
});

export default Fields;
