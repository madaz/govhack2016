import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Root from './root';
import {configureStore, updateRegionsAsync} from './store';
import api from './api/service';

const store = configureStore(undefined, api);

ReactDOM.render(
  <Root store={store} />,
  document.querySelector('#app'),
  () => {
    store.dispatch(updateRegionsAsync());
  }
);