import React from 'react';
import AddTimeLog from './AddTimeLog';
import TimeLog from './TimeLog';
import WeeklyLogs from './WeeklyLogs';
import TimeLogStore from '../stores/TimeLogStore';
import moment from 'moment';
import R from 'ramda';
import Immutable from 'immutable';

export default class Timesheet extends React.Component {
  constructor(props) {
    super(props);

    const storeState = TimeLogStore.getState();
    this.state = {
      logs: storeState.getLogs(),
      newLog: storeState.newLog
    };
    console.log(this.state);
  }

  componentDidMount() {
    // TimeLogStore.listen(this.onChange.bind(this));
    TimeLogStore.listen(this.onChange);
    TimeLogActions.fetchTimeLogs();
  }

  componentDidUnmound() {
    TimeLogStore.unlisten(this.onChange.bind(this));
  }

  onChange(store) {
    let logs = store.getLogs();
    this.setState({
      logs: store.getLogs(),
      newLog: store.newLog
    });
  }

  partitionBy(fn) {
    let key, arr;
    return function(list) {
      
    };
  }

  render() {
    let weekKey = function(someDate) {
      return ;
    }
    let logsByWeek = R.groupBy(R.compose(date => `${date.isoWeekYear()}-${date.isoWeek()}`,
                                         log => moment(log.get('date')) ),
                               this.state.logs);

    let weeklyLogs = R.compose(
      R.map(wk => (
        <WeeklyLogs
          key={ wk }
          logs={ logsByWeek.get(wk) }/>)
      ),
      R.sort((a, b) => b > a))
      (logsByWeek.keySeq().toJS());

    return (
      <div className="timesheet">
        <div className="header">
          <div>Add new log:</div>
          <AddTimeLog log={ this.state.newLog } />
        </div>
        <div className="content">
          <hr/>
          { weeklyLogs }
        </div>
      </div>
    );
  }
}
