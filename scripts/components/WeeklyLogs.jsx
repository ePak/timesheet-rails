import React from 'react';
import TimeLog from './TimeLog';
import R from 'ramda';
import WeeklyLogsHeader from './WeeklyLogsHeader';

export default class WeeklyLogs extends React.Component {
  render() {
    var timelogs = R.reduce(
      (acc, log) => {
        acc.total += log.hours
        acc.elements.push(
          <TimeLog
            key= { log.id }
            id={ log.id }
            date={ log.date }
            jiraKey={ log.key }
            hours={ log.hours } />);
        return acc;},
      { total: 0, elements: [] },
      this.props.logs);

    return (
      <div className="weeklylogs">
        <WeeklyLogsHeader total={ timelogs.total } date={ this.props.logs[0].date } />
        { timelogs.elements }
      </div>);
  }
}


WeeklyLogs.propTypes = {
  logs: React.PropTypes.array.isRequired
}
