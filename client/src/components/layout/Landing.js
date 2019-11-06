import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>شبكة المطورين العرب</h1>
          <p className='lead'>
           تواصل مع أقرانك من المبرمجين والمطورين العرب لتتعلم وتضيف للمحتوى العربي.
          </p>
          <div className='buttons'>
            <Link to='/register' className='btn btn-primary'>
              تسجيل
            </Link>
            <Link to='/login' className='btn btn-light'>
              دخول
            </Link>
          </div>
        </div>
      </div>
    </section>
    
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
