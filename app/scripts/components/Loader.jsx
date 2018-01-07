import React from 'react';
import PropTypes from 'prop-types';

const Loader = ({ pulse }) => {
  if (pulse) {
    return (
      <div className="app__loader app__loader--pulse">
        <div />
      </div>
    );
  }

  return (
    <div className="app__loader app__loader--rotate">
      <svg className="loader__svg">
        <circle
          className="loader__circle"
          cx="50"
          cy="50"
          r="20"
          fill="none"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};

Loader.propTypes = {
  pulse: PropTypes.bool,
};

Loader.defaultProps = {
  pulse: true,
};

export default Loader;
