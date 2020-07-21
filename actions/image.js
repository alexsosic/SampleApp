import {IMAGE_CHANGE} from '../constants';

export function changeImage(image) {
  return {
    type: IMAGE_CHANGE,
    payload: image,
  };
}
