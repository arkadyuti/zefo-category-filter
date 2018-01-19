/**
*
* Filters
*
*/

import React from 'react';
// import styled from 'styled-components';


const Filters = (props) => (
  <ul className="applied-filters">
    { Object.keys(props).map((key) => {
        props[key].map((eachFilter, i) => {
          return (
            <li key={`${key}-${i}`} className="filter">
              <span>{eachFilter.label}</span>
            </li>
          );
        });
    })
    }
  </ul>
);

Filters.propTypes = {

};

export default Filters;
