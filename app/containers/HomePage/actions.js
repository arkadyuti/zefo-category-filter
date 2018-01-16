/*
 *
 * HomePage actions
 *
 */

import {
  DEFAULT_ACTION,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function requestLoad(api) {
  console.log('actions',api)
    return {
        type: 'REQUEST_LOAD',
        payload: api
    };
}

export function receiveLoad(data) {
  console.log('receiveLoad',data)
    return {
        type: 'RECEIVE_LOAD',
        payload: data
    }
}