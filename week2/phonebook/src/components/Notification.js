import React from 'react';

const Notification = ({ message, notiType }) => {
  const classes = [notiType, 'notification'].join(' ');
  return (
    <div className={classes}>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
