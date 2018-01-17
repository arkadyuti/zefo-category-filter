/*
 *
 * HomePage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import makeSelectHomePage from './selectors';
import { fetchCategoryData, fetchFilterData } from './actions';
import CategoryHp from 'components/CategoryHP';


const mapStateToProps = createStructuredSelector({
  HomePage: makeSelectHomePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchCategoryData: (apiEndpoint) => dispatch(fetchCategoryData(apiEndpoint)),
    fetchFilterData: (apiEndpoint) => dispatch(fetchFilterData(apiEndpoint))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryHp);
