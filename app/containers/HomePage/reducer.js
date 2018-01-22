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
  FETCH_FILTER_DATA,
  FILTER_DATA_SUCCESS,
  FILTER_DATA_FAILURE,
  CATEGORY_DATA_SUCCESS_SCROLL,
  FETCH_CATEGORY_DATA_SCROLL
} from './constants';

const initialState = fromJS({
  initialFilters: { "filterList": [{ "type": "multiSelection", "value": "filterFeatures.condition", "label": "CONDITION", "pre_sym": null, "post_sym": null, "disabled": false, "showDisabled": true, "min": null, "max": null, "step": null, "items": null, "itemList": [{ "type": "TEXT", "imageURL": null, "text": "Unboxed Plus", "description": null, "value": "unboxed plus", "ordering": 1, "selected": false, "count": 11, "show": true, "disabled": false, "hidden": false, "itemClassType": null, "parent": null, "children": null }, { "type": "TEXT", "imageURL": null, "text": "Unboxed", "description": null, "value": "unboxed", "ordering": 2, "selected": false, "count": 90, "show": true, "disabled": false, "hidden": false, "itemClassType": null, "parent": null, "children": null }, { "type": "TEXT", "imageURL": null, "text": "Like New", "description": null, "value": "like new", "ordering": 3, "selected": false, "count": 11, "show": true, "disabled": false, "hidden": false, "itemClassType": null, "parent": null, "children": null }, { "type": "TEXT", "imageURL": null, "text": "Gently Used", "description": null, "value": "gently used", "ordering": 4, "selected": false, "count": 153, "show": true, "disabled": false, "hidden": false, "itemClassType": null, "parent": null, "children": null }, { "type": "TEXT", "imageURL": null, "text": "Well Used", "description": null, "value": "well used", "ordering": 5, "selected": false, "count": 8, "show": true, "disabled": false, "hidden": false, "itemClassType": null, "parent": null, "children": null }] }, { "type": "range", "value": "filterFeatures.offerPrice", "label": "PRICE", "pre_sym": "Rs.", "post_sym": " ", "disabled": false, "showDisabled": true, "min": 1000, "max": 50000, "step": 1000, "items": null, "itemList": [] }, { "type": "multiSelection", "value": "filterFeatures.Type", "label": "TYPE", "pre_sym": null, "post_sym": null, "disabled": false, "showDisabled": true, "min": null, "max": null, "step": null, "items": null, "itemList": [{ "type": "TEXT", "imageURL": null, "text": "Queen Size Beds", "description": null, "value": "queen size beds", "ordering": 1, "selected": false, "count": 142, "show": true, "disabled": false, "hidden": false, "itemClassType": null, "parent": null, "children": null }, { "type": "TEXT", "imageURL": null, "text": "King Size Beds", "description": null, "value": "king size beds", "ordering": 2, "selected": false, "count": 83, "show": true, "disabled": false, "hidden": false, "itemClassType": null, "parent": null, "children": null }, { "type": "TEXT", "imageURL": null, "text": "Single Beds", "description": null, "value": "single beds", "ordering": 3, "selected": false, "count": 38, "show": true, "disabled": false, "hidden": false, "itemClassType": null, "parent": null, "children": null }, { "type": "TEXT", "imageURL": null, "text": "Diwans", "description": null, "value": "diwans", "ordering": 4, "selected": false, "count": 10, "show": true, "disabled": false, "hidden": false, "itemClassType": null, "parent": null, "children": null }, { "type": "TEXT", "imageURL": null, "text": "Bunk Beds", "description": null, "value": "bunk beds", "ordering": 5, "selected": false, "count": 0, "show": false, "disabled": true, "hidden": false, "itemClassType": null, "parent": null, "children": null }] }, { "type": "multiSelection", "value": "filterFeatures.Material", "label": "MATERIAL", "pre_sym": null, "post_sym": null, "disabled": false, "showDisabled": true, "min": null, "max": null, "step": null, "items": null, "itemList": [{ "type": null, "imageURL": null, "text": "Solid Wood", "description": null, "value": "Solid Wood", "ordering": 0, "selected": false, "count": 83, "show": true, "disabled": false, "hidden": false, "itemClassType": null, "parent": null, "children": [{ "type": "TEXT", "imageURL": null, "text": "Sheesham / Mango Wood", "description": null, "value": "sheesham_mango", "ordering": 1, "selected": false, "count": 35, "show": true, "disabled": false, "hidden": false, "itemClassType": null, "parent": "Solid Wood", "children": null }, { "type": "TEXT", "imageURL": null, "text": "Rubber / Pine Wood", "description": null, "value": "rubber_pine", "ordering": 2, "selected": false, "count": 31, "show": true, "disabled": false, "hidden": false, "itemClassType": null, "parent": "Solid Wood", "children": null }, { "type": "TEXT", "imageURL": null, "text": "Teak Wood", "description": null, "value": "teak_wood", "ordering": 3, "selected": false, "count": 17, "show": true, "disabled": false, "hidden": false, "itemClassType": null, "parent": "Solid Wood", "children": null }] }, { "type": "TEXT", "imageURL": null, "text": "Plywood", "description": null, "value": "plywood", "ordering": 4, "selected": false, "count": 119, "show": true, "disabled": false, "hidden": false, "itemClassType": null, "parent": null, "children": null }, { "type": "TEXT", "imageURL": null, "text": "Engineered Wood", "description": null, "value": "engineered_wood", "ordering": 5, "selected": false, "count": 156, "show": true, "disabled": false, "hidden": false, "itemClassType": null, "parent": null, "children": null }, { "type": "TEXT", "imageURL": null, "text": "Metal-framed", "description": null, "value": "metal", "ordering": 6, "selected": false, "count": 40, "show": true, "disabled": false, "hidden": false, "itemClassType": null, "parent": null, "children": null }] }, { "type": "multiSelection", "value": "filterFeatures.storage", "label": "STORAGE", "pre_sym": null, "post_sym": null, "disabled": false, "showDisabled": true, "min": null, "max": null, "step": null, "items": null, "itemList": [{ "type": null, "imageURL": null, "text": "With Storage", "description": null, "value": "With Storage", "ordering": 0, "selected": false, "count": 82, "show": true, "disabled": false, "hidden": false, "itemClassType": null, "parent": null, "children": [{ "type": "TEXT", "imageURL": null, "text": "Box / Drawer Storage", "description": null, "value": "box_drawer_storage", "ordering": 1, "selected": false, "count": 67, "show": true, "disabled": false, "hidden": false, "itemClassType": null, "parent": "With Storage", "children": null }, { "type": "TEXT", "imageURL": null, "text": "Hydraulic Storage", "description": null, "value": "hydraulic_storage", "ordering": 2, "selected": false, "count": 15, "show": true, "disabled": false, "hidden": false, "itemClassType": null, "parent": "With Storage", "children": null }] }, { "type": "TEXT", "imageURL": null, "text": "Non-Storage", "description": null, "value": "no_storage", "ordering": 3, "selected": false, "count": 191, "show": true, "disabled": false, "hidden": false, "itemClassType": null, "parent": null, "children": null }] }, { "type": "multiSelection", "value": "filterFeatures.sellerBrand", "label": "BRAND", "pre_sym": null, "post_sym": null, "disabled": false, "showDisabled": true, "min": null, "max": null, "step": null, "items": null, "itemList": [{ "type": "TEXT", "imageURL": null, "text": "Urban Ladder", "description": null, "value": "urbanladder", "ordering": 1, "selected": false, "count": 13, "show": true, "disabled": false, "hidden": false, "itemClassType": null, "parent": null, "children": null }, { "type": "TEXT", "imageURL": null, "text": "Livspace", "description": null, "value": "livspace", "ordering": 2, "selected": false, "count": 3, "show": true, "disabled": false, "hidden": false, "itemClassType": null, "parent": null, "children": null }, { "type": "TEXT", "imageURL": null, "text": "Housefull", "description": null, "value": "housefull", "ordering": 3, "selected": false, "count": 0, "show": false, "disabled": true, "hidden": false, "itemClassType": null, "parent": null, "children": null }, { "type": "TEXT", "imageURL": null, "text": "Roman Living", "description": null, "value": "romanliving", "ordering": 4, "selected": false, "count": 7, "show": true, "disabled": false, "hidden": false, "itemClassType": null, "parent": null, "children": null }] }, { "type": "multiSelection", "value": "filterFeatures.Knock down", "label": "DISMANTLABLE", "pre_sym": null, "post_sym": null, "disabled": false, "showDisabled": true, "min": null, "max": null, "step": null, "items": null, "itemList": [{ "type": "TEXT", "imageURL": null, "text": "Yes", "description": null, "value": "yes", "ordering": 1, "selected": false, "count": 233, "show": true, "disabled": false, "hidden": false, "itemClassType": null, "parent": null, "children": null }, { "type": "TEXT", "imageURL": null, "text": "No", "description": null, "value": "no", "ordering": 2, "selected": false, "count": 38, "show": true, "disabled": false, "hidden": false, "itemClassType": null, "parent": null, "children": null }] }], "liveProductCount": 260, "sortBy": "popularity" },
  isLoading: false,
  responseDataScroll: null
});

function homePageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case CATEGORY_DATA_FAILURE:
      return state
        .set('errorData', action.payload)
    case FETCH_CATEGORY_DATA_SCROLL:
      return state
        .set('isLoading', true)
    case CATEGORY_DATA_SUCCESS:
      return state
        .set('responseData', action.payload).set('isLoading', false)
    case CATEGORY_DATA_SUCCESS_SCROLL:
      return state
        .set('responseDataScroll', action.payload).set('isLoading', false)
    case FILTER_DATA_FAILURE:
      return state
        .set('errorDataFilter', action.payload)
    case FILTER_DATA_SUCCESS:
      return state
        .set('responseDataFilter', action.payload).set('isLoading', false)
    default:
      return state;
  }
}


export default homePageReducer;
