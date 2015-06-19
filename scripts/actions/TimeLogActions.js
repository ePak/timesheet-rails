import alt from '../alt';

class TimeLogActions {
  addTimeLog(payload) {
    this.dispatch(payload);
  }
  updateTimeLog(payload) {
    this.dispatch(payload);
  }
  editTimeLog(payload) {
    this.dispatch(payload);
  }
  resetTimeLog(payload) {
    this.dispatch(payload);
  }
}

export default alt.createActions(TimeLogActions);
