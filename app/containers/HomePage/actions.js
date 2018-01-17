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
  FETCH_FILTER_DATA,
  FILTER_DATA_SUCCESS,
  FILTER_DATA_FAILURE,
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

// Filter Data
export function fetchFilterData(payload) {
  return {
    type: FETCH_FILTER_DATA,
    payload
  };
}
export function filterDataSuccess(payload) {
  return {
    type: FILTER_DATA_SUCCESS,
    payload
  };
}
export function filterDataFailure(payload) {
  return {
    type: FILTER_DATA_FAILURE,
    payload
  };
}