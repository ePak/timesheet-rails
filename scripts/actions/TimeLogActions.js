import alt from '../alt';

class TimeLogActions {
  addTimeLog(log) {
    this.dispatch(log);
  }
}

export default alt.createActions(TimeLogActions);
