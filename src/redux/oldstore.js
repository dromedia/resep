import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-community/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

// import reducer from './old-reducers';
import reducer from './reducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['favorite'],
};

const rootReducer = combineReducers({
  recipeReducer: persistReducer(persistConfig, reducer),
});

const store = createStore(rootReducer, applyMiddleware(thunk));
const appPersist = persistStore(store);

export {store, appPersist};
