import React from 'react';
import { render } from 'react-dom';

import './index.css';

import App from './components/App';

import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import persistState from 'redux-localstorage';
import reducer from './reducers';

import createHistory from 'history/createBrowserHistory';
import ScrollToTop from './components/ScrollToTop';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';

import registerServiceWorker from './registerServiceWorker';
import cacheFiles from './lib/cache-files';
import { createLogger } from 'redux-logger';

import ga from 'react-ga';

import './styles/global';

const history = createHistory({
  basename: process.env.NODE_ENV === 'production' ? '/mysensors-network-manager': '/'
});
const middleware = [routerMiddleware(history)];

middleware.push(createLogger({diff: true}));

const store = createStore(
  reducer,
  compose(
    applyMiddleware(...middleware),
    persistState(['networks'], {key: 'app-data'})
  )
);

store.dispatch({ type: 'MIGRATE' });

if(process.env.NODE_ENV === 'production') {
  ga.initialize('UA-100686637-1');

  history.listen(({ pathname }) => {
    ga.set({ page: pathname });
    ga.pageview(pathname);
  });
}

render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </ConnectedRouter>
  </Provider>
), document.getElementById('root'));

registerServiceWorker();
cacheFiles()
  .then(_ => store.dispatch({ type: 'SOURCE_CACHE', primed: true }))
  .catch(_ => store.dispatch({ type: 'SOURCE_CACHE', primed: false }));
