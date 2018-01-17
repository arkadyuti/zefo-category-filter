/**
*
* CategoryHp
*
*/

import React, { PropTypes } from 'react';
import FilterTypeBox from 'components/FilterTypeBox'
// import styled from 'styled-components';
export class CategoryHp extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.fetchCategoryData('https://m.gozefo.com/api/category/bangalore/beds/facets?filter=1&filterFeatures.condition=unboxed%20plus')
  }
  render() {
    const dropdown = [{
      label: "Unboxed Plus",
      subFilter: [{
        label: "Unboxed Plus"
      }, {
        label: "Unboxed"
      }, {
        label: "Like New"
      }]
    }, {
      label: "Unboxed",
      subFilter: [{
        label: "Unboxed Plus"
      }, {
        label: "Unboxed"
      }, {
        label: "Like New"
      }]
    }, {
      label: "Unboxed Plus",
    }]
    return (
      <main>
        <header className="center">header</header>
        <div className="container-fluid">
          <div className="row centerMe filter-container">
            <div className="col-md-10 filter-wrapper">
              <FilterTypeBox boxHeading="Type" dropdown={dropdown} />
            </div>
            <div className="col-md-2 filter-wrapper">
              <FilterTypeBox boxHeading="Condition" dropdown={dropdown} />
            </div>
          </div>
        </div>
      </main>
    );
  }
}

CategoryHp.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


export default CategoryHp;