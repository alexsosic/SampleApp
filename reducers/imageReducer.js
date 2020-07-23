import {IMAGE_CHANGE} from '../constants';

const initialState = {
  data: '',
  uri: '',
};

const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case IMAGE_CHANGE:
      return {
        ...state,
        data: action.payload.data,
        uri: action.payload.uri,
      };
    default:
      return state;
  }
};

export default imageReducer;
