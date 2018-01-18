/**
*
* CategoryHp
*
*/

import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';

import FilterTypeBox from 'components/FilterTypeBox'
import GridTypeOne from 'components/common/GridTypeOne'
// import styled from 'styled-components';
export class CategoryHp extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      productList: undefined,
      filterData: null,
      filterApiObject: {}
    };
  }
  setAppendUri(filterType, uri) {
    // this.setState({
    //   appendUri:  `${this.state.appendUri}&z.filters.filterFeatures.${filterType}[0]=${uri}`},
    // () => {
    //   const location = Object.assign({}, browserHistory.getCurrentLocation());
    //   Object.assign(location.query, this.state.appendUri);
    //   browserHistory.push(location);  
    //   debugger
    // });

  }
  removeApiUrlNode = (filterHeadingValue, filterValue) => {
    var finalArray = this.state.filterApiObject[filterHeadingValue]
    if (finalArray && Array.isArray(finalArray) && finalArray.indexOf(filterValue) > -1) {
      finalArray.splice(finalArray.indexOf(filterValue), 1);
    }
    if (finalArray && Array.isArray(finalArray) && finalArray.length < 1) {
      delete this.state.filterApiObject[filterHeadingValue];
    }
  }
  addApiUrlNode = (filterHeadingValue, filterValue, subfilterVal) => {
    // var newObj = {}
    // newObj[filterHeadingValue] = subfilterVal
    var finalArray = this.state.filterApiObject[filterHeadingValue] || []
    finalArray.push(filterValue)
    if (Array.isArray(subfilterVal)) {
      finalArray = finalArray.concat(subfilterVal);
    }
    this.state.filterApiObject[filterHeadingValue] = finalArray



  }
  handleFetchFilterData = () => {
    var finalObj = this.state.filterApiObject;
    if (finalObj) {
      var objKeysArray = Object.keys(finalObj);
      var newAllApiArray = [];
      var apiParam = [];
      var urlStr = ""
      objKeysArray.map((value, index) => {
        apiParam.push(value)
        finalObj[value].map((val, ind) => {
          urlStr += "&" + value + "=" + val;
        })
      })
      this.props.fetchFilterData("https://m.gozefo.com/api/category/bangalore/beds/facets?filter=1" + urlStr)
      this.props.fetchCategoryData('https://m.gozefo.com/api/category/bangalore/beds/product-list?filter=1&from=0&size=24&' + urlStr)
      browserHistory.push("?product-list?filter=1&" + urlStr);
    }
  }
  componentWillMount() {
    this.formatFilterData(this.props.HomePage.initialFilters.filterList);
    this.props.fetchCategoryData('https://m.gozefo.com/api/category/bangalore/beds/product-list?filter=1&from=0&size=24&')
    browserHistory.push("?product-list?filter=1");
  }
  componentDidMount() {
    // this.props.fetchCategoryData('https://m.gozefo.com/api/category/bangalore/beds/product-list?filter=1&from=0&size=24')
    this.props.fetchFilterData('https://m.gozefo.com/api/category/bangalore/beds/facets?filter=1')
  }
  componentWillReceiveProps(newProps) {
    if (newProps.HomePage && newProps.HomePage.responseData && newProps.HomePage.responseData.data) {
      const productList = newProps.HomePage.responseData.data.searchResponse.hits;
      Array.isArray(productList) && productList.length && this.setState({ productList });
    }
    if (newProps.HomePage && newProps.HomePage.responseDataFilter && newProps.HomePage.responseDataFilter.data) {
      const allFilterData = newProps.HomePage.responseDataFilter.data.filterList;
      this.formatFilterData(allFilterData);
    }
  }
  formatFilterData = (allFilterData) => {
    var filterDataArr = []
    for (var i = 0; i < allFilterData.length; i++) {
      if (allFilterData[i].type !== "range") {
        var filterObj = {}
        filterObj.boxHeading = allFilterData[i].label
        filterObj.value = allFilterData[i].value


        var itemList = allFilterData[i].itemList;
        var itemListArr = []
        for (var j = 0; j < itemList.length; j++) {
          var itemListObj = {}
          itemListObj.label = itemList[j].text
          itemListObj.value = encodeURIComponent(itemList[j].value)
          itemListObj.subFilter = itemList[j].children
          itemListArr.push(itemListObj);
        }
        filterObj.dropdown = itemListArr
        filterDataArr.push(filterObj)
      }
    }
    this.setState({ filterData: filterDataArr })
  }
  render() {
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
                    <FilterTypeBox key={index}
                      handleFetchFilterData={this.handleFetchFilterData}
                      filterHeadingValue={value.value}
                      removeApiUrlNode={this.removeApiUrlNode}
                      addApiUrlNode={this.addApiUrlNode}
                      boxHeading={value.boxHeading} dropdown={value.dropdown} />
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