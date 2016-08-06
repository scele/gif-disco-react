import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App';
import rootReducer from './reducers';
import './index.css';

import mockBackgrounds from './backgrounds.json';
import mockDancers from './dancers.json';
const store = createStore(rootReducer, { scenes: mockBackgrounds, dancers: mockDancers });

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);