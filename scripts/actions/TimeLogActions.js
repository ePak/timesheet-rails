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

  //This is from ALT tutorial.
  fetchTimeLogs() {
    this.dispatch();
    TimeLogsFetcher.fetch()
      .then((timeLogs) => {updateTimeLog(timeLogs);}) //ckk: should this be updateTimeLog or ..Logs
      .catch((errorMessage) => {this.actions.timeLogsFailed(errorMessage)});
  }

  timeLogsFailed(errorMessage) {
    this.dispatch(errorMessage);
  }
}

export default alt.createActions(TimeLogActions);
