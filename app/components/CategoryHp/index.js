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
      productList: undefined,
      filterData: null
    };
  }
  componentDidMount() {
    this.props.fetchCategoryData('https://m.gozefo.com/api/category/bangalore/beds/product-list?filter=1&from=0&size=24')
    this.props.fetchFilterData('https://m.gozefo.com/api/category/bangalore/beds/facets?filter=1')
  }
  componentWillReceiveProps(newProps) {
    if (newProps.HomePage && newProps.HomePage.responseData && newProps.HomePage.responseData.data) {
      const productList = newProps.HomePage.responseData.data.searchResponse.hits;
      Array.isArray(productList) && productList.length && this.setState({ productList });
    }
    if (newProps.HomePage && newProps.HomePage.responseDataFilter && newProps.HomePage.responseDataFilter.data) {
      const allFilterData = newProps.HomePage.responseDataFilter.data.filterList;
      // console.log(allFilterData)
      var filterDataArr = []
      for (var i = 0; i < allFilterData.length; i++) {
        if (allFilterData[i].type !== "range") {
          var filterObj = {}
          filterObj.boxHeading = allFilterData[i].label


          var itemList = allFilterData[i].itemList;
          var itemListArr = []
          for (var j = 0; j < itemList.length; j++) {
            // console.log("itemList", itemList[j])
            var itemListObj = {}
            itemListObj.label = itemList[j].text
            itemListObj.subFilter = itemList[j].children
            itemListArr.push(itemListObj);
            // console.log(itemList[j].text,itemList[j].children)
          }
          filterObj.dropdown = itemListArr
          filterDataArr.push(filterObj)
        }
      }
      // console.log(itemListArr)
      // console.log(filterDataArr)
      this.setState({ filterData: filterDataArr })
    }
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
              {
                this.state.filterData &&
                this.state.filterData.map((value, index) => {
                  return (

                    <FilterTypeBox key={index} boxHeading={value.boxHeading} dropdown={value.dropdown} />
                  )
                })
              }
            </div>
            {/* <div className="col-md-10 filter-wrapper">
              <FilterTypeBox boxHeading="Type" dropdown={dropdown} />
            </div>
            <div className="col-md-2 filter-wrapper">
              <FilterTypeBox boxHeading="Condition" dropdown={dropdown} allFilterData={this.props.HomePage.responseDataFilter} />
            </div> */}
          </div>
          <div className="row centerMe grid-container">
            {this.state.productList
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