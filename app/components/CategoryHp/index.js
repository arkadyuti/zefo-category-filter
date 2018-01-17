/**
*
* CategoryHp
*
*/

import React, { PropTypes } from 'react';

// import styled from 'styled-components';
export class CategoryHp extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.fetchCategoryData('https://m.gozefo.com/api/category/bangalore/beds/facets?filter=1&filterFeatures.condition=unboxed%20plus')
  }
  render() {
    return (
      <div>
        test
      </div>
    );
  }
}

CategoryHp.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


export default CategoryHp;