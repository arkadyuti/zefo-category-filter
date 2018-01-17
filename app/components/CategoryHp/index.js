/**
*
* CategoryHp
*
*/

import React, { PropTypes } from 'react';
import FilterTypeBox from 'components/FilterTypeBox'
import GridTypeOne from 'components/common/GridTypeOne'
// import styled from 'styled-components';
export class CategoryHp extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      productList: undefined
    };
  }
  componentDidMount() {
    this.props.fetchCategoryData('https://m.gozefo.com/api/category/bangalore/beds/product-list?filter=1&from=0&size=24')
  }
  componentWillReceiveProps(newProps) {
    // const {
    //   HomePage: {
    //     responseData: {
    //       data: {
    //         productList
    //       } = {}
    //     } = {}
    //   } = {}
    // } = newProps;

    const productList = newProps.HomePage.responseData.data.searchResponse.hits;

    Array.isArray(productList) && productList.length && this.setState({ productList });
    debugger
  }
  componentDidReceiveProps(newProps) {
    debugger
  }
  render() {
    const dropdown = [{
      label: "Unboxed Plus",
      subFilter: ["Unboxed Plus", "Unboxed", "Like New"]
    }, {
      label: "Unboxed",
      subFilter: []
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
          <div className="row centerMe grid-container">
            { this.state.productList
              ?
              this.state.productList.map((eachProduct) => (
                < GridTypeOne key={eachProduct.id} {...eachProduct} />
              ))
              :
                <div>Loading</div>
            }
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