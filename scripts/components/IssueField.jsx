import React from 'react';
import IssueFieldDropdown from './IssueFieldDropdown';
import IssueActions from '../actions/IssueActions';
import IssueStore from '../stores/IssueStore';

export default class IssueField extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      term: "",
      showDropdown: false,
    };
  }

  onIssueKeyChange(e) {
    e.stopPropagation();
    e.preventDefault();
    console.log("IssueField.onIssueKeyChange: " + e.target.value);
    let newTerm = e.target.value;
    this.setState({ term: (newTerm === this.props.term) ? "" : newTerm });
  }

  onDropdownButtonClick(e) {
    e.stopPropagation();
    e.preventDefault();
    this.setState({ showDropdown: !this.state.showDropdown });
  }

  render() {
    let fields;
    if (this.props.isEditing) {
      fields = [
        <input key="input" value={ this.state.term || this.props.term } onChange={ this.onIssueKeyChange.bind(this) }/>,
        <div key="dropdown-button" className="dropdown-button" onClick={ this.onDropdownButtonClick.bind(this) }></div>,
        <IssueFieldDropdown
          key="dropdown"
          show={ this.state.showDropdown }
          term={ this.state.term }/>
      ];
    } else {
      fields = (<span className="text">{ this.props.term }</span>);
    }
    return (<div className={ this.props.className }>{ fields }</div>);
  }

}

/*
IssueField.propTypes = {
  key: React.PropTypes.string.isRequired,
  isEditing: React.PropTypes.boolean.isRequired
}
*/


