import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import TimeLogActions from '../actions/TimeLogActions';
import R from 'ramda';

const displayFormat = 'ddd, Do MMM YY';

export default class TimeLog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isEditing: false, // TODO: make this dynamic
      isHovering: false
    };
  }

  onEditClick(e) {
    e.stopPropagation();
    e.preventDefault();
    this.setState({ isEditing: true });
  }

  canSave() {
    return this.props.log.get('dirty');
  }

  onSaveClick(e) {
    e.stopPropagation();
    e.preventDefault();
    TimeLogActions.updateTimeLog( this.props.log );
  }

  onCancelClick(e) {
    e.stopPropagation();
    e.preventDefault();
    TimeLogActions.resetTimeLog( this.props.log );
    this.setState({ isEditing: false });
  }

  onDateChange(new_date) {
    var dateStr = new_date.format('YYYY-MM-DD');
    TimeLogActions.editTimeLog( this.props.log.set('date', dateStr) );
  }

  onJiraKeyChange(e) {
    e.stopPropagation();
    e.preventDefault();
    TimeLogActions.editTimeLog(this.props.log.set('key', e.target.value));
  }

  isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  onHoursChange(e) {
    e.stopPropagation();
    e.preventDefault();
    const hours = e.target.value || 0;
    if (this.isNumber(hours)) {
      TimeLogActions.editTimeLog(this.props.log.set('hours', parseFloat(hours)));
    }
  }

  onLogMouseEnter(e) {
    e.stopPropagation();
    e.preventDefault();
    this.setState({ isHovering: true});
  }

  onLogMouseLeave(e) {
    e.stopPropagation();
    e.preventDefault();
    this.setState({ isHovering: false});
  }

  render() {
    let log = this.props.log;
    let keyField, dateField, hoursField, leftButton, rightButton;
    const date = moment(log.get('date'));
    const jiraKey = log.get('key');
    const hours = log.get('hours');

    if (this.state.isEditing) {
      dateField = (
        <DatePicker 
          selected={ date }
          onChange={ this.onDateChange.bind(this) } 
          dateFormat={ displayFormat } 
          weekStart={ 0 }/>); // calendar doesn't seem to behave correctly with 1
      keyField = (<input value={ jiraKey } onChange={ this.onJiraKeyChange.bind(this) }/>);
      hoursField = (<input value={ hours } onChange={ this.onHoursChange.bind(this) }/>);
      leftButton = (
        <button 
          className="timelog-save"
          disabled={ !this.canSave()}
          onClick={ this.onSaveClick.bind(this) } >
          Save
        </button>);
      rightButton = (<button className="timelog-cancel" onClick={ this.onCancelClick.bind(this) }>Cancel</button>);
    } else {
      dateField = date ? date.format("ddd, Do") : "";
      keyField = jiraKey;
      hoursField = hours;
      leftButton = this.state.isHovering
        ? (<button className="timelog-edit" onClick={ this.onEditClick.bind(this) }>Edit</button>)
        : null;
      rightButton = null;
    }

    return (
      <div className="timelog" 
        onMouseEnter={ this.onLogMouseEnter.bind(this) }
        onMouseLeave={ this.onLogMouseLeave.bind(this) } >
        <div className="timelog-date">{ dateField }</div>
        <div className="timelog-key">{ keyField }</div>
        <div className="timelog-hours">{ hoursField } hrs</div>
        <div className="timelog-leftButton">{ leftButton }</div>
        <div className="timelog-rightButton">{ rightButton }</div>
      </div>
    );
  }
}

TimeLog.propTypes = {
  log: React.PropTypes.object.isRequired
};

