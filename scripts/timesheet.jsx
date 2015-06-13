import React from 'react';
import TimeLog from './timelog';

export default class Timesheet extends React.Component {
  render() {
    let log = {key:"DEMO-1", hours:2, date:"2016-06-13", id:-1};
    return (
      <div className="timesheet">
        <div className="header">Timesheet</div>
        <div className="content">
          <TimeLog
            key= { log.id }
            id={ log.id }
            date={ log.date }
            jiraKey={ log.key }
            hours={ log.hours } />
        </div>
      </div>
    );
  }
}
