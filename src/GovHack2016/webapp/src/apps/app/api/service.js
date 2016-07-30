//let prefix = 'https://govhack2016ausc.azurewebsites.net';
let prefix = 'http://localhost:17130';

const api = {
  getRegions() {
    return fetch(`${prefix}/api/abs/dimension/regions`)
      .then(res => res.json());
  },
  getIndustries() {
    return fetch(`${prefix}/api/abs/dimension/industries`)
      .then(res => res.json());
  },  
  getSearch({industry, region}) {
    return fetch(`${prefix}/api/abs/dimension/query?industry=${industry}&region=${region}`)
      .then(res => res.json());
  },
  getDimensions() {
    return fetch(`${prefix}/api/abs/dimension`)
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

export default api;
//export default fakeApiService;