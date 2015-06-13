import alt from '../alt';
import TimeLogActions from '../actions/TimeLogActions';

class TimeLogStore {
  constructor() {
    this.timelogs = [
      {id: 1, date: '2016-06-08', key: 'DEMO-2', hours: 8, name: 'ehp'}
    ];

    this.bindListeners({
      handleAddTimeLog: TimeLogActions.ADD_TIME_LOG
    });
  }

  handleAddTimeLog(log) {
    this.timelogs.append(log);
  }
}

export default alt.createStore(TimeLogStore);
