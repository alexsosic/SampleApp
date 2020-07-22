import {APPID_CHANGE} from '../constants';

export function changeAppId(uuid) {
  return {
    type: APPID_CHANGE,
    payload: uuid,
  };
}
