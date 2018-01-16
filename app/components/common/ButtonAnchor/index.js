/**
*
* ButtonAnchor
*
*/

import React from 'react';
// import styled from 'styled-components';


class ButtonAnchor extends React.Component { // eslint-disable-line react/prefer-stateless-function
	render() {
		const { anchorClass, buttonText } = this.props;
		return (
			<a className={`ButtonAnchor ${anchorClass}`} href="/refer">
				<div className="referbox">
					{buttonText}
				</div>
			</a>
		);
	}
}

ButtonAnchor.propTypes = {

};

export default ButtonAnchor;
