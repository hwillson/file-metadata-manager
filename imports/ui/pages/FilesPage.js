import React from 'react';

import Files from '../components/files/Files';

const FilesPage = ({
  fields,
  categories,
  categoryValues,
}) => (
  <div className="files-page">
    <Files
      fields={fields}
      categories={categories}
      categoryValues={categoryValues}
    />
  </div>
);

FilesPage.propTypes = {
  fields: React.PropTypes.array.isRequired,
  categories: React.PropTypes.array.isRequired,
  categoryValues: React.PropTypes.array.isRequired,
};

export default FilesPage;
