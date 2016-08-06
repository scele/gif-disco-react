import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Router, Route, browserHistory } from 'react-router';
import { Scene, Scenes } from './App';
import rootReducer from './reducers';
import './index.css';

import mockBackgrounds from './backgrounds.json';
import mockDancers from './dancers.json';
const store = createStore(rootReducer, { scenes: mockBackgrounds, dancers: mockDancers });

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={Scenes} />
      <Route path='/:sceneId' component={Scene} />
    </Router>
  </Provider>,
  document.getElementById('root')
);