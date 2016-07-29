
const apiService = {
  getValues() {
    return fetch('/api/values')
      .then(res => res.json());
  },

  getFoo(foo) {
    return Promise.resolve(foo);
  },
}; 

export default apiService;