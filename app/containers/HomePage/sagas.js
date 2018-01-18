import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { categoryDataSuccess, categoryDataFailure, filterDataSuccess, filterDataFailure } from './actions';
import {
  FETCH_CATEGORY_DATA,
  FETCH_FILTER_DATA,
} from './constants';

// Individual exports for testing
export function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
  yield takeLatest(FETCH_CATEGORY_DATA, loadFlow);
  yield takeLatest(FETCH_FILTER_DATA, loadFlowFilter);
}
function fetchAPI(endpoint) {
  return axios({
    headers: { 'x-requested-with': 'https://www.gozefo.com' },
    // url: '/' + endpoint
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
function* loadFlowFilter({ payload }) {

  // yield put(filterDataSuccess({ data: { "filterList": [{ "type": "multiSelection", "value": "filterFeatures.condition", "label": "CONDITION", "pre_sym": null, "post_sym": null, "disabled": false, "showDisabled": true, "min": null, "max": null, "step": null, "items": null, "itemList": [{ "type": "TEXT", "imageURL": null, "text": "Unboxed Plus", "description": null, "value": "unboxed plus", "ordering": 1, "selected": false, "count": 11, "show": true, "disabled": false, "hidden": false, "itemClassType": null, "parent": null, "children": null }, { "type": "TEXT", "imageURL": null, "text": "Unboxed", "description": null, "value": "unboxed", "ordering": 2, "selected": false, "count": 91, "show": true, "disabled": false, "hidden": false, "itemClassType": null, "parent": null, "children": null }, { "type": "TEXT", "imageURL": null, "text": "Like New", "description": null, "value": "like new", "ordering": 3, "selected": false, "count": 11, "show": true, "disabled": false, "hidden": false, "itemClassType": null, "parent": null, "children": null }, { "type": "TEXT", "imageURL": null, "text": "Gently Used", "description": null, "value": "gently used", "ordering": 4, "selected": false, "count": 157, "show": true, "disabled": false, "hidden": false, "itemClassType": null, "parent": null, "children": null }, { "type": "TEXT", "imageURL": null, "text": "Well Used", "description": null, "value": "well used", "ordering": 5, "selected": false, "count": 7, "show": true, "disabled": false, "hidden": false, "itemClassType": null, "parent": null, "children": null }] }, { "type": "range", "value": "filterFeatures.offerPrice", "label": "PRICE", "pre_sym": "Rs.", "post_sym": " ", "disabled": false, "showDisabled": true, "min": 1000, "max": 50000, "step": 1000, "items": null, "itemList": [] }, { "type": "multiSelection", "value": "filterFeatures.Type", "label": "TYPE", "pre_sym": null, "post_sym": null, "disabled": false, "showDisabled": true, "min": null, "max": null, "step": null, "items": null, "itemList": [{ "type": "TEXT", "imageURL": null, "text": "Queen Size Beds", "description": null, "value": "queen size beds", "ordering": 1, "selected": false, "count": 147, "show": true, "disabled": false, "hidden": false, "itemClassType": null, "parent": null, "children": null }, { "type": "TEXT", "imageURL": null, "text": "King Size Beds", "description": null, "value": "king size beds", "ordering": 2, "selected": false, "count": 82, "show": true, "disabled": false, "hidden": false, "itemClassType": null, "parent": null, "children": null }, { "type": "TEXT", "imageURL": null, "text": "Single Beds", "description": null, "value": "single beds", "ordering": 3, "selected": false, "count": 38, "show": true, "disabled": false, "hidden": false, "itemClassType": null, "parent": null, "children": null }, { "type": "TEXT", "imageURL": null, "text": "Diwans", "description": null, "value": "diwans", "ordering": 4, "selected": false, "count": 10, "show": true, "disabled": false, "hidden": false, "itemClassType": null, "parent": null, "children": null }, { "type": "TEXT", "imageURL": null, "text": "Bunk Beds", "description": null, "value": "bunk beds", "ordering": 5, "selected": false, "count": 0, "show": false, "disabled": true, "hidden": false, "itemClassType": null, "parent": null, "children": null }] }, { "type": "multiSelection", "value": "filterFeatures.Material", "label": "MATERIAL", "pre_sym": null, "post_sym": null, "disabled": false, "showDisabled": true, "min": null, "max": null, "step": null, "items": null, "itemList": [{ "type": null, "imageURL": null, "text": "Solid Wood", "description": null, "value": "Solid Wood", "ordering": 0, "selected": false, "count": 85, "show": true, "disabled": false, "hidden": false, "itemClassType": null, "parent": null, "children": [{ "type": "TEXT", "imageURL": null, "text": "Sheesham / Mango Wood", "description": null, "value": "sheesham_mango", "ordering": 1, "selected": false, "count": 36, "show": true, "disabled": false, "hidden": false, "itemClassType": null, "parent": "Solid Wood", "children": null }, { "type": "TEXT", "imageURL": null, "text": "Rubber / Pine Wood", "description": null, "value": "rubber_pine", "ordering": 2, "selected": false, "count": 32, "show": true, "disabled": false, "hidden": false, "itemClassType": null, "parent": "Solid Wood", "children": null }, { "type": "TEXT", "imageURL": null, "text": "Teak Wood", "description": null, "value": "teak_wood", "ordering": 3, "selected": false, "count": 17, "show": true, "disabled": false, "hidden": false, "itemClassType": null, "parent": "Solid Wood", "children": null }] }, { "type": "TEXT", "imageURL": null, "text": "Plywood", "description": null, "value": "plywood", "ordering": 4, "selected": false, "count": 120, "show": true, "disabled": false, "hidden": false, "itemClassType": null, "parent": null, "children": null }, { "type": "TEXT", "imageURL": null, "text": "Engineered Wood", "description": null, "value": "engineered_wood", "ordering": 5, "selected": false, "count": 156, "show": true, "disabled": false, "hidden": false, "itemClassType": null, "parent": null, "children": null }, { "type": "TEXT", "imageURL": null, "text": "Metal-framed", "description": null, "value": "metal", "ordering": 6, "selected": false, "count": 43, "show": true, "disabled": false, "hidden": false, "itemClassType": null, "parent": null, "children": null }] }, { "type": "multiSelection", "value": "filterFeatures.storage", "label": "STORAGE", "pre_sym": null, "post_sym": null, "disabled": false, "showDisabled": true, "min": null, "max": null, "step": null, "items": null, "itemList": [{ "type": null, "imageURL": null, "text": "With Storage", "description": null, "value": "With Storage", "ordering": 0, "selected": false, "count": 82, "show": true, "disabled": false, "hidden": false, "itemClassType": null, "parent": null, "children": [{ "type": "TEXT", "imageURL": null, "text": "Box / Drawer Storage", "description": null, "value": "box_drawer_storage", "ordering": 1, "selected": false, "count": 67, "show": true, "disabled": false, "hidden": false, "itemClassType": null, "parent": "With Storage", "children": null }, { "type": "TEXT", "imageURL": null, "text": "Hydraulic Storage", "description": null, "value": "hydraulic_storage", "ordering": 2, "selected": false, "count": 15, "show": true, "disabled": false, "hidden": false, "itemClassType": null, "parent": "With Storage", "children": null }] }, { "type": "TEXT", "imageURL": null, "text": "Non-Storage", "description": null, "value": "no_storage", "ordering": 3, "selected": false, "count": 195, "show": true, "disabled": false, "hidden": false, "itemClassType": null, "parent": null, "children": null }] }, { "type": "multiSelection", "value": "filterFeatures.sellerBrand", "label": "BRAND", "pre_sym": null, "post_sym": null, "disabled": false, "showDisabled": true, "min": null, "max": null, "step": null, "items": null, "itemList": [{ "type": "TEXT", "imageURL": null, "text": "Urban Ladder", "description": null, "value": "urbanladder", "ordering": 1, "selected": false, "count": 13, "show": true, "disabled": false, "hidden": false, "itemClassType": null, "parent": null, "children": null }, { "type": "TEXT", "imageURL": null, "text": "Livspace", "description": null, "value": "livspace", "ordering": 2, "selected": false, "count": 3, "show": true, "disabled": false, "hidden": false, "itemClassType": null, "parent": null, "children": null }, { "type": "TEXT", "imageURL": null, "text": "Housefull", "description": null, "value": "housefull", "ordering": 3, "selected": false, "count": 0, "show": false, "disabled": true, "hidden": false, "itemClassType": null, "parent": null, "children": null }, { "type": "TEXT", "imageURL": null, "text": "Roman Living", "description": null, "value": "romanliving", "ordering": 4, "selected": false, "count": 7, "show": true, "disabled": false, "hidden": false, "itemClassType": null, "parent": null, "children": null }] }, { "type": "multiSelection", "value": "filterFeatures.Knock down", "label": "DISMANTLABLE", "pre_sym": null, "post_sym": null, "disabled": false, "showDisabled": true, "min": null, "max": null, "step": null, "items": null, "itemList": [{ "type": "TEXT", "imageURL": null, "text": "Yes", "description": null, "value": "yes", "ordering": 1, "selected": false, "count": 237, "show": true, "disabled": false, "hidden": false, "itemClassType": null, "parent": null, "children": null }, { "type": "TEXT", "imageURL": null, "text": "No", "description": null, "value": "no", "ordering": 2, "selected": false, "count": 38, "show": true, "disabled": false, "hidden": false, "itemClassType": null, "parent": null, "children": null }] }], "liveProductCount": 264, "sortBy": "popularity" } }));
  try {
    const data = yield call(fetchAPI, payload);
    yield put(filterDataSuccess(data));
  } catch (error) {
    console.log(error)
    yield put(filterDataFailure(error));
  }

}

// All sagas to be loaded
export default [
  defaultSaga,
];

// https://cors-anywhere.herokuapp.com/https://m.gozefo.com/api/category/bangalore/beds/facets?filter=1&filterFeatures.condition=unboxed%20plus