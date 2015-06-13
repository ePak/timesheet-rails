import React from 'react';
import TimeLog from './TimeLog';
import TimeLogStore from '../stores/TimeLogStore';

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

  render() {
    let timeLogs = this.state.timelogs.map( log => {
      return (
          <TimeLog
            key= { log.id }
            id={ log.id }
            date={ log.date }
            jiraKey={ log.key }
            hours={ log.hours } />
      );
    });
    return (
      <div className="timesheet">
        <div className="header">Timesheet</div>
        <div className="content">
          { timeLogs }
        </div>
      </div>
    );
  }
}
