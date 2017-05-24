import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import persistState from 'redux-localstorage';
import reducer from './reducers';

import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';

import { css } from 'glamor';
import { fontFamily } from './styles/typography';
import 'glamor-reset';
css.global('*', { boxSizing: 'border-box', fontFamily });

const history = createHistory();
const middleware = [routerMiddleware(history)];

if(process.env.NODE_ENV !== 'production') {
  middleware.push(require('redux-logger').createLogger({diff: true}));
}

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
