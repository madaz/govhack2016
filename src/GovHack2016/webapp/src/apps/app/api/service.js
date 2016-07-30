const api = {
  getRegions() {
    return fetch('/api/regions')
      .then(res => res.json());
  },
  getSearch(criteria) {
    return fetch('/api/search')
      .then(res => res.json());
  }
};

const fakeApiService = {
  getRegions() {
    return Promise.resolve([
      'Brisbane',
      'Sydney',
      'Melbourne',
      'Perth'
    ]);
  },
  getSearch(criteria) {
    return Promise.resolve([
      { industry: "ICT", metric: 1.56 },
      { industry: "Hospitality", metric: 5.56 }
    ]);
  }  
};

//export default api;
export default fakeApiService;