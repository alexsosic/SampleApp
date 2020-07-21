import {IMAGE_CHANGE} from '../constants';

const initialState = {
  file: '',
};

const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case IMAGE_CHANGE:
      return {
        ...state,
        file: action.payload,
      };
    default:
      return state;
  }
};

export default imageReducer;
