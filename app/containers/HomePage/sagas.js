import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { categoryDataSuccess, categoryDataFailure, filterDataSuccess, filterDataFailure, categoryDataSuccessScroll } from './actions';
import {
  FETCH_CATEGORY_DATA,
  FETCH_FILTER_DATA,
  FETCH_CATEGORY_DATA_SCROLL,
} from './constants';

export function* defaultSaga() {
  yield takeLatest(FETCH_CATEGORY_DATA, loadFlow);
  yield takeLatest(FETCH_CATEGORY_DATA_SCROLL, loadFlowScroll);
  yield takeLatest(FETCH_FILTER_DATA, loadFlowFilter);
}
/**
   * Function to make ajax call handling the CORS 
   * @param {String} endpoint
   *    Full url for ajax call
**/
function fetchAPI(endpoint) {
  return axios({
    headers: { 'x-requested-with': 'https://www.gozefo.com' },
    url: 'https://cors-anywhere.herokuapp.com/' + endpoint
  }).then(function (response) {
    return response;
  }).catch(function (error) {
    throw error;
  });
}

function* loadFlow({ payload }) { // Fuction to call category data
  try {
    const data = yield call(fetchAPI, payload);
    yield put(categoryDataSuccess(data));
  } catch (error) {
    yield put(categoryDataFailure(error));
  }
}
function* loadFlowScroll({ payload }) {// Fuction to call category data after scroll to bottom
  try {
    const data = yield call(fetchAPI, payload);
    yield put(categoryDataSuccessScroll(data));
  } catch (error) {
    yield put(categoryDataFailure(error));
  }
}
function* loadFlowFilter({ payload }) {// Fuction to call filter data
  try {
    const data = yield call(fetchAPI, payload);
    yield put(filterDataSuccess(data));
  } catch (error) {
    yield put(filterDataFailure(error));
  }

}

// All sagas to be loaded
export default [
  defaultSaga,
];

// https://cors-anywhere.herokuapp.com/https://m.gozefo.com/api/category/bangalore/beds/facets?filter=1&filterFeatures.condition=unboxed%20plus