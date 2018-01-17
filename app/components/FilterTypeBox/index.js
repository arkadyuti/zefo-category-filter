/**
*
* FilterTypeBox
*
*/

import React from 'react';
// import styled from 'styled-components';


class FilterTypeBox extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      display: false,
      dropdown: this.props.dropdown,
    }
  }
  handleOnMouseEnter = () => {
    this.setState({ display: true })
  }
  handleOnMouseLeave = () => {
    this.setState({ display: false })
  }
  handleFilterOnClick(index, evt) {
    let dropdown = this.state.dropdown;
    console.log("filter", this.state.dropdown[index]);

    if (dropdown[index].checked) {
      dropdown[index].checked = false
      if (dropdown[index].subFilter && dropdown[index].subFilter.length > 0) {
        dropdown[index].subFilter.map((val, ind) => {
          dropdown[index].subFilter[ind].checked = false
        })
      }
    } else {
      dropdown[index].checked = true
      if (dropdown[index].subFilter && dropdown[index].subFilter.length > 0) {
        dropdown[index].subFilter.map((val, ind) => {
          dropdown[index].subFilter[ind].checked = true
        })
      }
    }
    this.setState({
      dropdown: dropdown
    })
  }
  handleSubFilterOnClick = (index, ind, evt) => {
    let dropdown = this.state.dropdown;
    if (dropdown[index]["subFilter"][ind] && dropdown[index]["subFilter"][ind].checked) {
      dropdown[index]["subFilter"][ind].checked = false
      dropdown[index].checked = false
    } else {
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
    })
    // dropdown[index].subFilter[ind] = false
    // if (evt.target.checked) {

    // } else {
    //   dropdown[index].checked = false
    //   this.setState({
    //     dropdown: dropdown
    //   })
    // }
  }
  componentDidMount() {
    // console.log("did", this.state.dropdown)
  }
  componentWillReceiveProps(newProps) {
    // if (newProps && newProps.allFilterData && newProps.allFilterData.data && newProps.allFilterData.data.filterList) {
    //   console.log(newProps.allFilterData.data.filterList)
    //   const filterList = newProps.allFilterData.data.filterList;
    //   var dropdown = [];
    //   for (var i = 0; i < filterList.length; i++) {
    //     if (filterList[i].type !== "range") {
    //       // console.log(filterList[i])
    //       var data = {};
    //       data.label = filterList[i].label
    //       dropdown.push(data)
    //     }
    //   }
    //   console.log(dropdown)
    // }
  }
  render() {
    const { boxHeading } = this.props;
    const { dropdown } = this.state;
    console.log(this.props)
    return (
      <li className="box-filter-wrapper" onMouseEnter={this.handleOnMouseEnter} onMouseLeave={this.handleOnMouseLeave}>
        <a>{boxHeading}</a>
        {this.state.display && <ul className="box-filter-dropdown">
          {
            dropdown && dropdown.map((value, index) => {
              let checkCheckedFilter = value.checked ? "checked" : ""
              return (
                <li key={index} className="cursorPointer">
                  <a className="cursorPointer">
                    <input className="cursorPointer" type="checkbox" id={"filter-" + index} onChange={this.handleFilterOnClick.bind(this, index)} checked={checkCheckedFilter} />
                    <label className="cursorPointer" htmlFor={"filter-" + index}>{value.label}</label>
                    {value.subFilter && value.subFilter.length > 0 &&
                      value.subFilter.map((val, ind) => {
                        let checkChecked = val.checked ? "checked" : ""
                        return (
                          <div key={"subfilter" + ind} className="cursorPointer subfilter-dropdown">
                            <span className="cursorPointer">
                              <input className="cursorPointer" type="checkbox" id={"subfilter-" + ind} onChange={this.handleSubFilterOnClick.bind(this, index, ind)} checked={checkChecked} />
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
