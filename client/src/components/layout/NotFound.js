import React, { Fragment } from 'react';

const NotFound = () => {
  return (
    <Fragment>
      <h1 className='x-large text-primary'>
        <i className='fas fa-exclamation-triangle' /> الصفحة مفقودة
      </h1>
      <p className='large'>عذرًا، هذه الصفحة غير موجودة.</p>
    </Fragment>
  );
};

export default NotFound;
