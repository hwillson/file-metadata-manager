import moment from 'moment';

const TimeHelper = {
  currentYear() {
    return moment().format('YYYY');
  },
};

export default TimeHelper;
