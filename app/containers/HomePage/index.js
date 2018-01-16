/*
 *
 * HomePage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import makeSelectHomePage from './selectors';
import {requestLoad} from './actions'

export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount(){
    this.props.dispatch(requestLoad('/user'))

  }
  render() {
    return (
      <main>
        sad
      </main>
    );
  }
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  HomePage: makeSelectHomePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
