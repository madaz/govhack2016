import {
  createStore,
  applyMiddleware,
  compose} from 'redux';
import * as createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import {appStore} from './';


const getMiddleware = (api) => {
  const middlewares = [
    thunk.withExtraArgument({
      api
    }),
  ];

  if ('production' !== process.env.NODE_ENV) {
    middlewares.push(createLogger());
  }  

  return applyMiddleware(...middlewares);
};

const getEnhancers = () => {
  const enhancers = [];
  if (window.devToolsExtension) {
    enhancers.push(window.devToolsExtension());
  }
  return enhancers;
}

const configureStore = (initialState, api) => {
  const middlewares = [];
  const store = createStore(
    appStore,
    initialState,
    compose(
      getMiddleware(api),
      ...getEnhancers()
    )
  );

  return store;
};

export {configureStore};