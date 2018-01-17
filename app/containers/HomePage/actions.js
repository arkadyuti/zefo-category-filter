/*
 *
 * HomePage actions
 *
 */

import {
  DEFAULT_ACTION,
  FETCH_CATEGORY_DATA,
  CATEGORY_DATA_SUCCESS,
  CATEGORY_DATA_FAILURE,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function fetchCategoryData(payload) {
  return {
    type: FETCH_CATEGORY_DATA,
    payload
  };
}
export function categoryDataSuccess(payload) {
  return {
    type: CATEGORY_DATA_SUCCESS,
    payload
  };
}
export function categoryDataFailure(payload) {
  return {
    type: CATEGORY_DATA_FAILURE,
    payload
  };
}