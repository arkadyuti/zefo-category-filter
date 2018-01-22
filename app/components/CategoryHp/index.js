/**
*
* CategoryHp
*
*/

import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';

import FilterTypeBox from 'components/FilterTypeBox'
import GridTypeOne from 'components/common/GridTypeOne'
import AppliedFilters from 'components/AppliedFilters'

// import styled from 'styled-components';
export class CategoryHp extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      productList: undefined,
      filterData: null, // Arranged category filter data 
      filterApiObject: {}, // URL params to be added in the browser 
      filtersFromUrl: [], // URL params received from the browser
      categorySize: [0, 24], // Api count
      appliedFilters: []
    };
  }
  /**
   * Function to remove applied filters below the dropdown
   * @param {String} label
   *    Applied filters value to be add/remove from the State
   *    
   **/
  removeAppliedFilters = (label) => {
    var finalArray = this.state.appliedFilters
    if (finalArray && Array.isArray(finalArray) && finalArray.indexOf(label) > -1) {
      finalArray.splice(finalArray.indexOf(label), 1);
    }
    this.setState({})
  }
  addAppliedFilters = (label) => { // Function to add applied filters below the dropdown
    this.state.appliedFilters.push(label)
    this.setState({})
  }
  /**
   * Function to remove URL value from state
   * @param {String} filterHeadingValue
   *    Dropdown heading/value.
   * @param {String} filterValue
   *    Value to be remove from the State
  **/
  removeApiUrlNode = (filterHeadingValue, filterValue) => {
    var finalArray = this.state.filterApiObject[filterHeadingValue]
    if (finalArray && Array.isArray(finalArray) && finalArray.indexOf(filterValue) > -1) {
      finalArray.splice(finalArray.indexOf(filterValue), 1);
    }
    if (finalArray && Array.isArray(finalArray) && finalArray.length < 1) {
      delete this.state.filterApiObject[filterHeadingValue];
    }
  }
  /**
   * Function to add URL params to state depending on the checkbox
   * @param {String} filterHeadingValue
   *    Dropdown heading/value.
   * @param {String} filterValue
   *    Value to be remove from the State
   * @param {String} subfilterVal
   *    Sub-selection dropdown value.
   * @param {String} label
   *    Value to be remove from the State
   **/
  addApiUrlNode = (filterHeadingValue, filterValue, subfilterVal, label) => {
    var finalArray = this.state.filterApiObject[filterHeadingValue] || []
    finalArray.push(filterValue)
    if (Array.isArray(subfilterVal)) {
      finalArray = finalArray.concat(subfilterVal);
    }
    this.state.filterApiObject[filterHeadingValue] = finalArray
  }
  /**
   * Function to arrange the api data for presentational component
  **/
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
      browserHistory.push("?product-list?filter=1&from=0&size=24&" + urlStr);
    }
  }
  componentWillMount() {
    this.fetchCategoryFromUrl()
  }
  /**
   * Function to arrange the api data for presentational component
   * This function also applies for lazy loading data fetching
   * @param {Number} dataFrom
   *    Url parameter for initial count for api data
  **/
  fetchCategoryFromUrl = (dataFrom) => {
    var categorySize = dataFrom ? dataFrom : ""
    var filtersFromUrl = window.location.href.split('&filterFeatures.').filter((a, i) => i !== 0),
      urlOnLoad = window.location.href;
    if (dataFrom) {
      if (urlOnLoad.indexOf("&from=") === -1) {
        this.props.fetchCategoryDataScroll("https://m.gozefo.com/api/category/bangalore/beds/product-list?filter=1&from=" + this.state.categorySize[0] + "&size=24&");
      } else {
        urlOnLoad = urlOnLoad.replace("&from=0", "&from=" + dataFrom)
        urlOnLoad = urlOnLoad.replace('http://localhost:3333/?', 'https://m.gozefo.com/api/category/bangalore/beds/');
        this.props.fetchCategoryDataScroll(urlOnLoad);
      }
      return
    }
    if (filtersFromUrl.length) {
      urlOnLoad = urlOnLoad.replace('http://localhost:3333/?', 'https://m.gozefo.com/api/category/bangalore/beds/');
      var abc = {};
      filtersFromUrl.map(function (a, i) {
        var b = a.split('='),
          type = "filterFeatures." + b[0],
          value = b[1];
        abc[type] ? abc[type].push(value) : abc[type] = [value];
      });
      this.setState({
        filtersFromUrl: abc
      })
    }
    else {
      urlOnLoad = 'https://m.gozefo.com/api/category/bangalore/beds/product-list?filter=1&from=0&size=24&';
    }
    this.formatFilterData(this.props.HomePage.initialFilters.filterList);
    this.props.fetchCategoryData(urlOnLoad);
  }
  /**
   * Function to arrange handle scroll end and make ajax call to server for next set of data
  **/
  handleOnScroll = () => {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      this.state.categorySize[0] = this.state.categorySize[0] + 24
      this.fetchCategoryFromUrl(this.state.categorySize[0])
    }
  }
  componentDidMount() {
    window.addEventListener("scroll", this.handleOnScroll);
  }
  componentWillReceiveProps(newProps) {
    // Category data inserted into state
    if (newProps.HomePage && newProps.HomePage.responseData && newProps.HomePage.responseData.data) {
      const productList = newProps.HomePage.responseData.data.searchResponse.hits;
      Array.isArray(productList) && productList.length && this.setState({ productList });
    }
    // Filter data inserted into state, alter in every request
    if (newProps.HomePage && newProps.HomePage.responseDataFilter && newProps.HomePage.responseDataFilter.data) {
      const allFilterData = newProps.HomePage.responseDataFilter.data.filterList;
      this.formatFilterData(allFilterData);
    }
    // Category data after scroll to bottom
    if (newProps.HomePage && newProps.HomePage.responseDataScroll && newProps.HomePage.responseDataScroll.data) {
      const oldCategoryArray = this.state.productList
      const responseArray = newProps.HomePage.responseDataScroll.data.searchResponse.hits
      this.setState({
        productList: oldCategoryArray.concat(responseArray)
      })
    }
  }
  /**
   * Function to arrange the filter api data for presentational component
   * @param {Array} allFilterData
   *    Url parameter for initial count for api data
  **/
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
          itemListObj.checked = itemList[j].checked
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
        {this.props.HomePage.isLoading &&
          <div className="is-loading">
            <img src="img/giphy.gif" alt="" />
          </div>
        }

        <header className="center">header</header>
        <div className="container-fluid">
          <div className="row centerMe filter-container">
            <div className="col-md-12 filter-wrapper">
              {
                this.state.filterData &&
                this.state.filterData.map((value, index) => {
                  return (
                    <FilterTypeBox key={index}
                      filtersFromUrl={this.state.filtersFromUrl}
                      addAppliedFilters={this.addAppliedFilters}
                      removeAppliedFilters={this.removeAppliedFilters}
                      handleFetchFilterData={this.handleFetchFilterData}
                      removeApiUrlNode={this.removeApiUrlNode}
                      filterHeadingValue={encodeURIComponent(value.value)}
                      addApiUrlNode={this.addApiUrlNode}
                      boxHeading={value.boxHeading}
                      dropdown={value.dropdown}
                    />
                  )
                })
              }
            </div>
            <AppliedFilters appliedFilters={this.state.appliedFilters} />
          </div>
          <div className="row centerMe grid-container">
            {this.state.productList
              ?
              this.state.productList.map((eachProduct, index) => (
                < GridTypeOne key={index} {...eachProduct} />
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