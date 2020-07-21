import {createStore, combineReducers} from 'redux';

import descriptionReducer from '../reducers/descriptionReducer';
import locationReducer from '../reducers/locationReducer';
import imageReducer from '../reducers/imageReducer';

const rootReducer = combineReducers({
  image: imageReducer,
  description: descriptionReducer,
  location: locationReducer,
});

const configureStore = () => {
  return createStore(rootReducer);
};

export default configureStore;
