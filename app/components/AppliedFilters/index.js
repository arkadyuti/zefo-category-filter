/**
*
* AppliedFilters
*
*/

import React from 'react';
// import styled from 'styled-components';


class AppliedFilters extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { appliedFilters } = this.props
    return (
      <div className="col-md-12 filter-wrapper">
        <span>Applied Filters</span>
        <ul className="applied-filters">
          {appliedFilters &&
            appliedFilters.map((val, ind) => {
              return (
                <li key={ind}>{val}</li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}

AppliedFilters.propTypes = {

};

export default AppliedFilters;
