import React from 'react';
import TimeLog from './TimeLog';
import R from 'ramda';
import moment from 'moment';

export default class WeeklyLogsHeader extends React.Component {
  formatDate(date) {
    return date.format('Do MMMM YY');
  }

  render() {
    const firstDayOfWeek = moment(this.props.date).startOf('isoWeek');
    const lastDayOfWeek = moment(this.props.date).endOf('isoWeek');
    return (
      <div className="weeklyLogsHeader pure-g">
        <div className="dateRange pure-u-3-4">
          <div className="text">
            { this.formatDate(firstDayOfWeek) } - { this.formatDate(lastDayOfWeek) } 
          </div>
        </div>
        <div className="totalHours pure-u-1-12 pure-g">
          <div className="pure-u-3-4">
            <div className="text">{ this.props.total }</div>
          </div>
          <div className="pure-u-1-4">hrs</div>
        </div>
      </div>
    );
  }
}

WeeklyLogsHeader.propTypes = {
  date: React.PropTypes.string.isRequired,
  total: React.PropTypes.number.isRequired
}

