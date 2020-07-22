import {APPID_CHANGE} from '../constants';

const initialState = {
  id: '',
};

const appIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case APPID_CHANGE:
      return {
        ...state,
        id: action.payload,
      };
    default:
      return state;
  }
};

export default appIdReducer;
