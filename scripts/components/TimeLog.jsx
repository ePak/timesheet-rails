import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

const dateFormat = 'ddd, Do MMM YY';

export default class TimeLog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isEditing: true // TODO: make this dynamic
    };
  }

  onDateChange(new_date) {
    console.log(new_date.format(dateFormat));
  }

  render() {
    let log = this.props;
    let keyField, dateField, hoursField;
    const date = log.date ? moment(log.date) : null;

    if (this.state.isEditing) {
      dateField = (
        <DatePicker 
          selected={ date }
          onChange={ this.onDateChange.bind(this) } 
          dateFormat={ dateFormat } />);
      keyField = (<input value={ log.jiraKey } />);
      hoursField = (<input value={ log.hours } />);
    } else {
      dateField = date ? date.format("ddd, Do") : "";
      keyField = log.jiraKey;
      hoursField = log.hours;
    }

    return (
      <div className="timelog">
        <span className="timelog-date">{ dateField }</span>
        <span className="timelog-key">{ keyField }</span>
        <span className="timelog-hours">{ hoursField } hours</span>
        <button className="timelog-save">Save</button>
        <button className="timelog-cancel">Cancel</button>
      </div>
    );
  }
}

TimeLog.propTypes = {
  id: React.PropTypes.number.isRequired,
  date: React.PropTypes.string.isRequired,
  jiraKey: React.PropTypes.string.isRequired,
  hours: React.PropTypes.number.isRequired
};

