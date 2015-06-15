import TimeLog from './TimeLog';

export default class AddTimeLog extends TimeLog {
  constructor(props) {
    super(props);
    this.state.isEditing = true;
  }

  canSave() {
    return true;
  }
}
