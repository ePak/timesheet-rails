import React from 'react';
import TimeLog from './TimeLog';
import WeeklyLogs from './WeeklyLogs';
import TimeLogStore from '../stores/TimeLogStore';
import moment from 'moment';
import R from 'ramda';

export default class Timesheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = TimeLogStore.getState();
  }

  componentDidMount() {
    TimeLogStore.listen(this.onChange.bind(this));
  }

  componentDidUnmound() {
    TimeLogStore.unlisten(this.onChange.bind(this));
  }

  onChange(logs) {
    this.setState(log);
  }

  partitionBy(fn) {
    let key, arr;
    return function(list) {
      
    };
  }

  render() {
    let weekKey = function(someDate) {
      return `${someDate.isoWeekYear()}-${someDate.isoWeek()}`;
    }
    let logsByWeek = R.groupBy(R.compose(weekKey, log => { return moment(log.date) }),
                               this.state.timelogs);
    /*
    let sortedWeeks = R.compose(R.sort((a,b) => b > a), R.keys)(logsByWeek);
    let weeklyLogs = R.map(week => (
      <WeeklyLogs
        key={ week }
        logs={ logsByWeek[week] }/>),
        sortedWeeks);
    */

    let weeklyLogs = R.compose(
      R.map(week => (
        <WeeklyLogs
          key={ week }
          logs={ logsByWeek[week] }/>)
      ),
      R.sort((a, b) => b > a),
      R.keys)
      (logsByWeek);

    return (
      <div className="timesheet">
        <div className="header">Timesheet</div>
        <div className="content">
          { weeklyLogs }
        </div>
      </div>
    );
  }
}
