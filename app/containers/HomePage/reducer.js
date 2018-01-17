/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  FETCH_CATEGORY_DATA,
  CATEGORY_DATA_SUCCESS,
  CATEGORY_DATA_FAILURE,
} from './constants';

const initialState = fromJS({
  isLoading: false,
});

function homePageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case CATEGORY_DATA_FAILURE:
      return state
        .set('errorData', action.payload)
    case CATEGORY_DATA_SUCCESS:
      return state
        .set('responseData', action.payload)
    default:
      return state;
  }
}


export default homePageReducer;
