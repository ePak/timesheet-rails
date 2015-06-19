import React from 'react';
import R from 'ramda';

export default class IssueGroup extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    console.log('IssueGroup.render()');
    if (!this.props.issues.size) return null;

    let list = R.map(issue => {
        let key = issue.get('key');
        return (
          <div key={ key } className="issue pure-g">
            <div className="pure-u-1-4">{ key }</div>
            <div className="pure-u-3-4">{ issue.get('summary') }</div>
          </div>
        );
      },
      this.props.issues);

    return (
      <div className="issueGroup">
        <div className="issueGroupHeader">{ this.props.title }</div>
        { list }
      </div>
    );
  }
}
