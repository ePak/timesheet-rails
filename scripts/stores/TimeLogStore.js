import alt from '../alt';
import TimeLogActions from '../actions/TimeLogActions';
import R from 'ramda';
import Immutable from 'immutable';
import moment from 'moment';

class TimeLogStore {
  constructor() {
    this.timelogs = [];
    this.errorMessage = null;

    // this.timelogs = Immutable.fromJS([
    //   {id: 1, date: '2015-06-10', key: 'DEMO-2', hours: 4, name: 'ehp'},
    //   {id: 2, date: '2015-06-09', key: 'DEMO-2', hours: 2, name: 'ehp'},
    //   {id: 3, date: '2015-06-09', key: 'DEMO-1', hours: 6, name: 'ehp'},
    //   {id: 4, date: '2015-06-08', key: 'DEMO-1', hours: 8, name: 'ehp'},
    //   {id: 5, date: '2015-06-05', key: 'DEMO-3', hours: 8, name: 'ehp'},
    //   {id: 6, date: '2015-06-04', key: 'DEMO-4', hours: 8, name: 'ehp'},
    //   {id: 7, date: '2015-06-03', key: 'DEMO-5', hours: 8, name: 'ehp'}
    // ]);

    //ckk: Copy from my branch
    //this.timelogs = [];
    //fetch("http://localhost:3000/api/timelogs")
    //  .then(function(res){ return res.json()})
    //  .then((function(obj){ this.timelogs = obj;}).bind(this));
    this.dirty = new Immutable.Map();

    this.newLog = this.getEmptyLog();

    this.bindListeners({
      handleAddTimeLog: TimeLogActions.ADD_TIME_LOG,
      handleUpdateTimeLog: TimeLogActions.UPDATE_TIME_LOG,
      handleEditTimeLog: TimeLogActions.EDIT_TIME_LOG,
      handleResetTimeLog: TimeLogActions.RESET_TIME_LOG,
      handleFetchTimeLogs: TimeLogActions.FETCH_TIME_LOGS,
      handleTimeLogsFailed: TimeLogActions.TIME_LOGS_FAILED
    });

    this.keyGen = 8;

    this.getLogs = this.getLogs.bind(this);
  }

  getEmptyLog() {
    return Immutable.fromJS({
      id: -1,
      date: moment().format('YYYY-MM-DD'),
      key: "",
      hours: 0
    });
  }

  getLogs() {
    return this.timelogs.map(log => {
      const id = log.get('id');
      return this.dirty.has(id) ? this.dirty.get(id) : log;
    });
  }

  handleAddTimeLog(log) {
    log.id = this.keyGen++;
    this.timelogs = R.compose(R.sort((a, b) => b.date > a.date),
                              R.append(log))
                              (this.timelogs);
  }

  handleUpdateTimeLog(payload) {
    let [index, log] = this.timelogs.findEntry( log => log.get('id') === payload.get('id') );
    // validate & PUT to server
  }

  handleEditTimeLog(payload) {
    const id = payload.get('id');

    if (id === -1) {
      this.newLog = payload;
      return;
    }

    console.log('test');
    const log = this.timelogs.find( log => log.get('id') === id );
    this.dirty = log.equals(payload.delete('dirty')) 
      ? this.dirty.delete(id)
      : this.dirty.set(id, payload.set('dirty', true));
  }

  handleResetTimeLog(payload) {
    if (payload.get('id') === -1) {
      this.newLog = this.getEmptyLog();
      return;
    }

    this.dirty.delete(payload.get('id'));
  }

  handleFetchTimeLogs() {
    //ckk: Let's follow ALT tutorial and see what happens.
    //     Reset the arry while we're fetching new timelogs.
    this.timelogs = [];
  }

  handleTimeLogsFailed(errorMessage) {
    this.errorMessage = errorMessage;
  }

}

export default alt.createStore(TimeLogStore);
