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
        latitude: Number(action.payload.latitude.toFixed(5)),
        longitude: Number(action.payload.longitude.toFixed(5)),
      };
    default:
      return state;
  }
};

export default locationReducer;
