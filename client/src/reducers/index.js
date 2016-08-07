import { combineReducers } from 'redux';
import scenes from './scenes';
import dancers from './dancers';

const rootReducer = combineReducers({
  scenes,
  dancers,
});

export default rootReducer;