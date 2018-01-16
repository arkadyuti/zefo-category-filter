import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { receiveLoad } from './actions';

// Individual exports for testing
export function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
}
function loadApi(api) {
  console.log('arg',api)
  return axios.get('https://m.gozefo.com/api/category/bangalore/sofas/one-seater/product-list?filter=1&from=0&size=24&filterFeatures.Sofa%20Softness=soft&filterFeatures.Type=one%20seater')
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return response;
    });
}
function* watchLoadRequest() {
  yield* takeLatest('REQUEST_LOAD', loadFlow);
}
function* loadFlow({api}) {
  const data = yield call(loadApi,api);
  yield put(receiveLoad(data));
}
// All sagas to be loaded
export default [
  loadFlow,
];
