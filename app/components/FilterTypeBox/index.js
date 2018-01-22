/**
*
* FilterTypeBox
*
*/

import React from 'react';
import { browserHistory } from 'react-router';
// import styled from 'styled-components';


class FilterTypeBox extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      display: false,
      dropdown: this.props.dropdown, // Dropdown data
      filterURL: {},
      checkForValues: []
    };
  }
  handleOnMouseEnter = () => {
    this.setState({ display: true })
  }
  handleOnMouseLeave = () => {
    this.setState({ display: false })
  }
  handleFilterOnChange(index, evt) {
    let dropdown = this.state.dropdown;
    if (dropdown[index].checked) {
      dropdown[index].checked = false
      if (dropdown[index].subFilter && dropdown[index].subFilter.length > 0) {
        dropdown[index].subFilter.map((val, ind) => {
          dropdown[index].subFilter[ind].checked =
            this.props.removeApiUrlNode(this.props.filterHeadingValue, dropdown[index].subFilter[ind].value);
            this.props.removeAppliedFilters(dropdown[index].subFilter[ind].text)
        })
      }
      this.props.removeApiUrlNode(this.props.filterHeadingValue, dropdown[index].value)
      this.props.removeAppliedFilters(dropdown[index].label)
    } else {
      dropdown[index].checked = true
      if (dropdown[index].subFilter && dropdown[index].subFilter.length > 0) {
        var subfilterVal = []
        this.state.filterURL[this.props.filterHeadingValue] = {}
        dropdown[index].subFilter.map((val, ind) => {
          dropdown[index].subFilter[ind].checked = true
          subfilterVal.push(dropdown[index].subFilter[ind].value)
          this.props.addApiUrlNode(this.props.filterHeadingValue, dropdown[index].subFilter[ind].value)
          this.props.addAppliedFilters(dropdown[index].subFilter[ind].text)
        })
      } else {
        this.props.addApiUrlNode(this.props.filterHeadingValue, dropdown[index].value)
        this.props.addAppliedFilters(dropdown[index].label)
      }
    }
    this.setState({
      dropdown: dropdown
    }, this.props.handleFetchFilterData())
  }
  handleSubFilterOnChange = (index, ind, evt) => {
    let dropdown = this.state.dropdown;
    if (dropdown[index]["subFilter"][ind] && dropdown[index]["subFilter"][ind].checked) {
      dropdown[index]["subFilter"][ind].checked = false
      dropdown[index].checked = false
      this.props.removeApiUrlNode(this.props.filterHeadingValue, dropdown[index]["subFilter"][ind].value)
      this.props.removeAppliedFilters(dropdown[index]["subFilter"][ind].text)
    } else {
      this.props.addApiUrlNode(this.props.filterHeadingValue, dropdown[index]["subFilter"][ind].value)
      this.props.addAppliedFilters(dropdown[index]["subFilter"][ind].text)
      dropdown[index]["subFilter"][ind].checked = true
      var allSubFilter = false
      for (var i = 0; i < dropdown[index]["subFilter"].length; i++) {
        if (!dropdown[index]["subFilter"][i].checked) {
          allSubFilter = false
        } else {
          allSubFilter = true
        }
      }
      if (allSubFilter) {
        dropdown[index].checked = true
      }

    }
    this.setState({
      dropdown: dropdown
    }, this.props.handleFetchFilterData())
  }
  componentWillMount() {
    var urlParams = this.props.filtersFromUrl[this.props.filterHeadingValue];
    if (this.props.filtersFromUrl[this.props.filterHeadingValue]) {
      this.state.dropdown.map((value, index) => {
        if (value.subFilter) {
          value.subFilter.map((val, ind) => {
            if (urlParams.indexOf(val.value) >= 0) {
              this.state.dropdown[index].subFilter[ind].checked = true;
              this.props.addApiUrlNode(this.props.filterHeadingValue, val.value)
              this.props.addAppliedFilters(val.text)
            }
          })
        }
        else if (urlParams.indexOf(value.value) >= 0) {
          this.state.dropdown[index].checked = true;
          this.props.addApiUrlNode(this.props.filterHeadingValue, value.value)
          this.props.addAppliedFilters(value.label)
        }
      })
    }
    if (this.props.filtersFromUrl && this.props.filtersFromUrl[this.props.boxHeading] && this.props.filtersFromUrl[this.props.boxHeading].length) {
      this.setState({
        checkForValues: this.props.filtersFromUrl[this.props.boxHeading]
      });
    }
  }
  render() {
    const { boxHeading } = this.props;
    const { dropdown, checkForValues, display } = this.state;
    return (
      <li className="box-filter-wrapper" onMouseEnter={this.handleOnMouseEnter} onMouseLeave={this.handleOnMouseLeave}>
        <a>{boxHeading}</a>
        {display && <ul className="box-filter-dropdown">
          {
            dropdown && dropdown.map((value, index) => {
              const checkCheckedFilter = value.checked ? "checked" : "";
              return (
                <li key={index} className="cursorPointer">
                  <a className="cursorPointer">
                    <input
                      className="cursorPointer"
                      type="checkbox"
                      id={"filter-" + index}
                      onChange={this.handleFilterOnChange.bind(this, index)}
                      checked={checkCheckedFilter} />
                    <label className="cursorPointer" htmlFor={"filter-" + index}>{value.label}</label>
                    {value.subFilter && value.subFilter.length > 0 &&
                      value.subFilter.map((val, ind) => {
                        let checkChecked = val.checked ? "checked" : "";
                        return (
                          <div key={"subfilter" + ind} className="cursorPointer subfilter-dropdown">
                            <span className="cursorPointer">
                              <input
                                className="cursorPointer"
                                type="checkbox" id={"subfilter-" + ind}
                                onChange={this.handleSubFilterOnChange.bind(this, index, ind)}
                                checked={checkChecked} />
                              <label className="cursorPointer" htmlFor={"subfilter-" + ind}>{val.text}</label>
                            </span>
                          </div>
                        )
                      })
                    }
                  </a>
                </li>
              )
            })
          }
        </ul>}
      </li>
    );
  }
}

FilterTypeBox.propTypes = {

};

export default FilterTypeBox;
