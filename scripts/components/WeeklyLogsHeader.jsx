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
      <div className="weeklyLogsHeader">
        <span className="dateRange">
          { this.formatDate(firstDayOfWeek) } - { this.formatDate(lastDayOfWeek) } 
        </span>
        <span className="totalHours">
          { this.props.total } hours
        </span>
      </div>
    );
  }
}

WeeklyLogsHeader.propTypes = {
  date: React.PropTypes.string.isRequired,
  total: React.PropTypes.number.isRequired
}

