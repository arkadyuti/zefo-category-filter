import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { categoryDataSuccess, categoryDataFailure } from './actions';
import {
  FETCH_CATEGORY_DATA,
} from './constants';

// Individual exports for testing
export function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
  yield takeLatest(FETCH_CATEGORY_DATA, loadFlow);
}
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

function* loadFlow({ payload }) {
  try {
    const data = yield call(fetchAPI, payload);
    yield put(categoryDataSuccess(data));
  } catch (error) {
    console.log(error)
    yield put(categoryDataFailure(error));
  }

}

// All sagas to be loaded
export default [
  defaultSaga,
];

// https://cors-anywhere.herokuapp.com/https://m.gozefo.com/api/category/bangalore/beds/facets?filter=1&filterFeatures.condition=unboxed%20plus