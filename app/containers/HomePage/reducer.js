/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
} from './constants';

const initialState = fromJS({
  isLoading: false,
});

function homePageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case 'REQUEST_LOAD':
      return state
        .set('isLoading', true)
    case 'RECEIVE_LOAD':
      return state.set('isLoading',false).set('data',action.payload);
    default:
      return state;
  }
}

// return {
//         ...state,
//         ...action.payload,
//         count: state.count + 1,
//         isLoading: false,
//       }

export default homePageReducer;
