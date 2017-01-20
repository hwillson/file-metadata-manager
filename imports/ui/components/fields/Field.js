import React, { Component } from 'react';

class Field extends Component {


  render() {
    return (
      <div className="field">
        {this.props.field.name}
      </div>
    );
  }
}

Field.propTypes = {
  field: React.PropTypes.object.isRequired,
};

export default Field;
