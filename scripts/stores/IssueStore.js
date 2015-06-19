import alt from '../alt';
import R from 'ramda';
import Immutable from 'immutable';
import IssueActions from '../actions/IssueActions';

let _admin = new Immutable.List();
let _mine = new Immutable.List();
let _myTeam = new Immutable.List();
let _myTesting = new Immutable.List();
let _history = new Immutable.List();
let _cache = new Immutable.Map();
let _lastResult = new Immutable.Map();

class IssueStore {
  constructor() {
    console.log('IssueStore.ctor');
    this.initialized = false;

    this.exportPublicMethods({
      getDefaultIssues: this._getDefaultIssues,
      search: this._search.bind(this),
      getIssues: this._getIssues.bind(this)
    });

    this.bindListeners({
      handleSearchIssue: IssueActions.SEARCH_ISSUE,
      handleFetchStandardIssues: IssueActions.FETCH_STANDARD_ISSUES
    });

    IssueActions.fetchStandardIssues();
  }

  _getDefaultIssues() {
    return new Immutable.OrderedMap({
      "My Admin": _admin,
      "My CRs": _mine,
      "My Team": _myTeam,
      "My Testing": _myTesting,
      "Recently Viewed": _history
    });
  }

  _search(term) {
    if (!term) return this._getDefaultIssues();
  };

  _matchIssue(re, issue) {
    return issue.some(v => re.test(v));
  }

  _getIssues(term) {
    let result = this._getDefaultIssues();
    console.log(`_getIssues: ${result}`);
    if (!term) return result;


    console.log('IssueStore._getIssues: filtering');
    let re = new RegExp(`.*${term}.*`, 'i');
    result = result
      .map(list => list.filter(item => this._matchIssue(re,item)))
      .filter(v => v.size)
      ;
    return result;
    // TODO: if result is empty, then use cache, if still empty then fetch
  }

  handleSearchIssue(payload) {
  }
  makeImmutableList(list) {
    return new Immutable.List(R.map(i => new Immutable.Map(i),list||[]));
  }

  handleFetchStandardIssues(payload) {
    console.log('handleFetchStandardIssues');

    _admin = this.makeImmutableList(payload.admin);
    _mine = this.makeImmutableList(payload.mine);
    _myTeam = this.makeImmutableList(payload.myTeam);
    _myTesting = this.makeImmutableList(payload.myTesting);
    _history = this.makeImmutableList(payload.history);
    _cache = _cache.withMutations(map => {
      R.compose(R.map(issue => map.set(issue.key, issue)),

                R.flatten,
                R.values)
      (payload);
    });
    this.initialized = true;
  }
}

export default alt.createStore(IssueStore);
