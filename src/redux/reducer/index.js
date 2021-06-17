import {combineReducers} from 'redux';
import {homeReducer} from './home';

const reducer = combineReducers({
  homeReducer,
});

export default reducer;
