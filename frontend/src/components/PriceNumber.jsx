import React, { useState } from 'react';

const PriceNumber = ({ number }) => {
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  return <span>{formatNumber(number)}</span>;
};

export default PriceNumber;
