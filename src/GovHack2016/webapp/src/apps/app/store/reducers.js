import {combineReducers} from 'redux';
import {ACTIONS} from './actions';


const regions = (
  state = [],
  action
) => {  
  switch (action.type) {
    case ACTIONS.UPDATE_REGIONS:
      return action.regions;
    default:
      return state;
  }
};

const results = (
  state = null,
  action
) => {
  switch (action.type) {
    case ACTIONS.UPDATE_RESULTS:
      return action.results;
    default:
      return state;
  }
};


export const appStore = combineReducers({
  regions,
  results,
});
