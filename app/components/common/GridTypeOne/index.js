/**
*
* GridTypeOne
*
*/

import React from 'react';

const GridTypeOne = ({ imageLink, name, condition, price, offerPrice, discount }) => (// eslint-disable-line react/prefer-stateless-function
  <button className="col-xs-12 col-sm-3 col-md-3">
    <div className="gridTypeOneContainer">
      <div className="brandImage">
        <img src={imageLink} alt="" />
      </div>
      <div className="brandDesc">{name}</div>
      <div className="promoText">{condition}</div>
      <div className="priceContainer">
        <span className="offerPrice">Rs {offerPrice}</span>
        <span className="strikedPrice">Rs {price}</span>
        <span className="discount">{discount}% off</span>
      </div>
    </div>
  </button>
);

GridTypeOne.propTypes = {

};

export default GridTypeOne;
