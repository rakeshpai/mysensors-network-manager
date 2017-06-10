import React, { Component } from 'react';
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
import { currentVersion } from './reducers/migrations';
import createLogger from 'redux-logger';

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
    persistState(['networks', 'version'], {key: 'app-data'})
  )
);

if(process.env.NODE_ENV === 'production') {
  ga.initialize('UA-100686637-1');

  history.listen(({ pathname }) => {
    ga.set({ page: pathname });
    ga.pageview(pathname);
  });
}

class Root extends Component {
  componentWillMount() {
    store.dispatch({ type: 'MIGRATE' });
  }

  render() {
    if(store.getState().version !== currentVersion) return <div></div>;

    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App network={store.getState().network} />
        </ConnectedRouter>
      </Provider>
    )
  }
}

render(<Root />, document.getElementById('root'));

registerServiceWorker();
cacheFiles()
  .then(_ => store.dispatch({ type: 'SOURCE_CACHE', primed: true }))
  .catch(_ => store.dispatch({ type: 'SOURCE_CACHE', primed: false }));
