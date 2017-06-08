import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import persistState from 'redux-localstorage';
import reducer from './reducers';

import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';

import registerServiceWorker from './registerServiceWorker';
import cacheFiles from './lib/cache-files';

import './styles/global';

const history = createHistory({
  basename: process.env.NODE_ENV === 'production' ? '/mysensors-network-manager': '/'
});
const middleware = [routerMiddleware(history)];

//if(process.env.NODE_ENV !== 'production') {
  middleware.push(require('redux-logger').createLogger({diff: true}));
//}

const store = createStore(
  reducer,
  compose(
    applyMiddleware(...middleware),
    persistState('networks', {key: 'app-data'})
  )
);

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App network={store.getState().network} />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
cacheFiles()
  .then(_ => store.dispatch({ type: 'SOURCE_CACHE', primed: true }))
  .catch(_ => store.dispatch({ type: 'SOURCE_CACHE', primed: false }));
