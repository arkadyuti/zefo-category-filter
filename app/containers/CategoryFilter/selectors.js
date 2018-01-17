import { createSelector } from 'reselect';

/**
 * Direct selector to the categoryFilter state domain
 */
const selectCategoryFilterDomain = () => (state) => state.get('categoryFilter');

/**
 * Other specific selectors
 */


/**
 * Default selector used by CategoryFilter
 */

const makeSelectCategoryFilter = () => createSelector(
  selectCategoryFilterDomain(),
  (substate) => substate.toJS()
);

export default makeSelectCategoryFilter;
export {
  selectCategoryFilterDomain,
};
