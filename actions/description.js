import {DESCRIPTION_CHANGE} from '../constants';

export function changeDescription(description) {
  return {
    type: DESCRIPTION_CHANGE,
    payload: description,
  };
}
