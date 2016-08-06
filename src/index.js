import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Router, Route, browserHistory } from 'react-router';
import { Scene, Scenes } from './App';
import rootReducer from './reducers';
import './index.css';

import DevTools from './DevTools';

import mockBackgrounds from './backgrounds.json';
import mockDancers from './dancers.json';
import { applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
const store = createStore(
  rootReducer,
  { scenes: mockBackgrounds, dancers: mockDancers },
  compose(
    applyMiddleware(createLogger()),
    DevTools.instrument()
  )
);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={browserHistory}>
        <Route path='/' component={Scenes} />
        <Route path='/:sceneId' component={Scene} />
      </Router>
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('root')
);