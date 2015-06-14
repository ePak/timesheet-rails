var mockData = [ //This mockData is a hardcode from TomeLogStore.js
      {id: 1, date: '2015-06-10', key: 'DEMO-2', hours: 4, name: 'ehp'},
      {id: 2, date: '2015-06-09', key: 'DEMO-2', hours: 2, name: 'ehp'},
      {id: 3, date: '2015-06-09', key: 'DEMO-1', hours: 6, name: 'ehp'},
      {id: 4, date: '2015-06-08', key: 'DEMO-1', hours: 8, name: 'ehp'},
      {id: 5, date: '2015-06-05', key: 'DEMO-3', hours: 8, name: 'ehp'},
      {id: 6, date: '2015-06-04', key: 'DEMO-4', hours: 8, name: 'ehp'},
      {id: 7, date: '2015-06-03', key: 'DEMO-5', hours: 8, name: 'ehp'}
    ];

var TimeLogsFetcher = {
  fetch: function () {
    //Returning a Promise.
    return new Promise(function (resolve, reject) {
      // For now simulate an asynchronous action where data is fetched on our API.
      setTimeout (function () {
        resolve(mockData);
      }, 250);
    });
  }
};