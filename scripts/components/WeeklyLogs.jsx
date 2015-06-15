import React from 'react';
import TimeLog from './TimeLog';
import R from 'ramda';
import WeeklyLogsHeader from './WeeklyLogsHeader';
import Immutable from 'immutable';

export default class WeeklyLogs extends React.Component {
  render() {
    let total = 0;
    let timelogs = R.map(
      log => {
        total += log.get('hours');
        return (<TimeLog key={ log.get('id') } log={ log } />)
      },
      this.props.logs);

    return (
      <div className="weeklylogs">
        <WeeklyLogsHeader total={ total } date={ this.props.logs.getIn([0, 'date']) } />
        { timelogs }
      </div>);
  }
}


WeeklyLogs.propTypes = {
  logs: React.PropTypes.object.isRequired
}
