import {combineReducers} from 'redux';

import {ACTIONS} from './actions';


const foo = (
  state = {},
  action
) => {
  switch (action.type) {
    case ACTIONS.UPDATE_FOO:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

const values = (
  state = [],
  action
) => {  
  switch (action.type) {
    case ACTIONS.UPDATE_VALUES:
      return action.values;
    default:
      return state;
  }
};


export const appStore = combineReducers({
  foo,
  values
});
