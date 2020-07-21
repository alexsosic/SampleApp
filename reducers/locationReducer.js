import {LOCATION_CHANGE} from '../constants';

const initialState = {
  latitude: 0,
  longitude: 0,
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOCATION_CHANGE:
      return {
        ...state,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
      };
    default:
      return state;
  }
};

export default locationReducer;
