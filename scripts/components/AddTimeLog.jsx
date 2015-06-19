import TimeLog from './TimeLog';
import TimeLogActions from '../actions/TimeLogActions';

export default class AddTimeLog extends TimeLog {
  constructor(props) {
    super(props);
    this.state.isEditing = true;
  }

  canSave() {
    return true;
  }

  onSaveClick(e) {
    e.stopPropagation();
    e.preventDefault();
    TimeLogActions.addTimeLog( this.props.log );
  }
}
