import {combineReducers} from 'redux';
import {homeReducer} from './home';
import {globalReducer} from './global';

const reducer = combineReducers({
  homeReducer,
  globalReducer,
});

export default reducer;
