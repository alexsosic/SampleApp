import {DESCRIPTION_CHANGE} from '../constants';

const initialState = {
  text: '',
};

const descriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case DESCRIPTION_CHANGE:
      return {
        ...state,
        text: action.payload,
      };
    default:
      return state;
  }
};

export default descriptionReducer;
