import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import FieldsPage from '../pages/FieldsPage';
import FieldsCollection from '../../api/fields/collection';

const FieldsContainer = createContainer(() => {
  const fieldsHandle = Meteor.subscribe('fields.all');
  return {
    fieldsReady: fieldsHandle.ready(),
    fields: FieldsCollection.find().fetch(),
  };
}, FieldsPage);

export default FieldsContainer;
