import React from 'react';
import IssueStore from '../stores/IssueStore';
import IssueGroup from './IssueGroup';

export default class IssueFieldDropdown extends React.Component {
  constructor(props) {
    super(props);
    console.log('IssueFieldDropdown.ctor');
    this.state = {
      issues: IssueStore.getIssues(props.term),
      term: props.term
    };
  }

  onChange(store) {
    let newState = {
      initialized: store.initialized,
      issues: IssueStore.getIssues(this.props.term)
    };
    this.setState(newState);
  }

  componentDidMount() {
    console.log('IssueFieldDropdown.componentDidMount');
    IssueStore.listen(this.onChange.bind(this));
  }

  componentDidUnmount() {
    console.log('IssueFieldDropdown.componentDidUnmount');
    IssueStore.unlisten(this.onChange.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    console.log('IssueFieldDropdown.componentWillRecieveProps: ' + nextProps.term);
    // TODO: check hidden toggling
    if (nextProps.term !== this.props.term) {
      let newIssues = IssueStore.getIssues(nextProps.term);
      this.setState({
        issues: newIssues,
        term: nextProps.term
      });
      return true;
    }
  }

  render() {
    let content = [];
    if (this.props.show) {
      console.log(`IssueFieldDropdown.render: `);
      this.state.issues.forEach((v, k) => {
        content.push(<IssueGroup key={ k } title={ k } issues={ v } />)
      });
    }
    return (
      <div className="dropdown" hidden={ !this.props.show }>
        { content }
      </div>
    );
  }

}

