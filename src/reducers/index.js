import { combineReducers } from 'redux';
import scenes from './scenes';

const rootReducer = combineReducers({
  scenes,
  dancers: (state = []) => state,
});

export default rootReducer;