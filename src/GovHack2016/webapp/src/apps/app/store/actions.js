export const ACTIONS = {
  UPDATE_REGIONS: 'UPDATE_REGIONS',
  UPDATE_RESULTS: 'UPDATE_RESULTS',
  UPDATE_INDUSTRIES: 'UPDATE_INDUSTRIES',
};

export const updateRegions = (regions) => ({
  type: ACTIONS.UPDATE_REGIONS,
  regions,
});

export const updateRegionsAsync = () =>
  (dispatch, getState, data) => {
    return data.api.getRegions()
      .then((regions) => {
        dispatch(updateRegions(regions));
        return regions;
      });
  };

export const updateIndustry = (industries) => ({
  type: ACTIONS.UPDATE_INDUSTRIES,
  industries,
});

export const updateIndustriesAsync = () =>
  (dispatch, getState, data) => {
    return data.api.getIndustries()
      .then((industries) => {
        dispatch(updateIndustry(industries));
        return industries;
      });
  };  

export const updateResults = (results) => ({
  type: ACTIONS.UPDATE_RESULTS,
  results,
});  

export const searchAsync = (criteria) =>
  (dispatch, getState, data) => {
    return data.api.getSearch(criteria)
      .then((results) => {
        dispatch(updateResults(results));
        return results;
      });
  };
  