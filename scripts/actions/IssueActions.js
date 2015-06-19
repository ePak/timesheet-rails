import alt from '../alt';

class IssueActions {
  constructor() {
    this.getIssues = this._getIssues.bind(this);
  }

  _getIssues(term) {
    if (!this.initialized) {
      this.fetchStandardIssues();
    }

  }

  searchIssue(term) {
    fetch(`/api/issues/search?term=${term}`)
    .then(res => console.log(res))
    .catch(e => console.log(e));
  }

  fetchStandardIssues() {
    fetch("/api/issues/standard", {credentials: 'include'})
    .then(res => res.json())
    .then(data => {
      //console.log(data);
      this.dispatch(data);
    })
    .catch(e => console.log(e));
    return false;
  }

  
}

export default alt.createActions(IssueActions);
