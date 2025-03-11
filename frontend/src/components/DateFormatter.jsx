import React from 'react';

const DateFormatter = ({ isoDate }) => {
  const date = new Date(isoDate);

  const formattedDate = date.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return <div>{formattedDate}</div>;
};

export default DateFormatter;
