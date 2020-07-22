import {createStore, combineReducers} from 'redux';

import descriptionReducer from '../reducers/descriptionReducer';
import locationReducer from '../reducers/locationReducer';
import imageReducer from '../reducers/imageReducer';
import appIdReducer from '../reducers/appIdReducer';

const rootReducer = combineReducers({
  appId: appIdReducer,
  image: imageReducer,
  description: descriptionReducer,
  location: locationReducer,
});

const configureStore = () => {
  return createStore(rootReducer);
};

export default configureStore;
