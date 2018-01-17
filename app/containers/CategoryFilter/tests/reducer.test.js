
import { fromJS } from 'immutable';
import categoryFilterReducer from '../reducer';

describe('categoryFilterReducer', () => {
  it('returns the initial state', () => {
    expect(categoryFilterReducer(undefined, {})).toEqual(fromJS({}));
  });
});
