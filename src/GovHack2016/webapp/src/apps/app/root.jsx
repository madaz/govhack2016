import * as React from 'react';
import {Provider} from 'react-redux';

import {App} from './containers';
import {configureStore} from './store';
import api from './api/service';

const store = configureStore({
  foo: {name: 'Mr webapp-react'},
}, api);

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;