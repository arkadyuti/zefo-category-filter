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
      display: false
    }
  }
  handleOnMouseEnter = () => {
    this.setState({ display: true })
  }
  handleOnMouseLeave = () => {
    this.setState({ display: false })
  }
  render() {
    const { dropdown, boxHeading } = this.props;
    return (
      <li className="box-filter-wrapper" onMouseEnter={this.handleOnMouseEnter} onMouseLeave={this.handleOnMouseLeave}>
        <a>{boxHeading}</a>
        {this.state.display && <ul className="box-filter-dropdown">
          {
            dropdown && dropdown.map((value, index) => {
              return (
                <li key={index} className="cursorPointer">
                  <a className="cursorPointer">
                    <input className="cursorPointer" type="checkbox" id={"filter-" + index} />
                    <label className="cursorPointer" htmlFor={"filter-" + index}>{value.label}</label>
                    {value.subFilter && value.subFilter.length > 0 &&
                      value.subFilter.map((val, ind) => {
                        return (
                          <div key={"subfilter" + ind} className="cursorPointer subfilter-dropdown">
                            <span className="cursorPointer">
                              <input className="cursorPointer" type="checkbox" id={"subfilter-" + ind} />
                              <label className="cursorPointer" htmlFor={"subfilter-" + ind}>{val}</label>
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
