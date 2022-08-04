import React from 'react';
import PropTypes from 'prop-types';

import './GlobalStyles.scss';

function GlobalStyles({ children }) {
  return React.Children.only(children); // only 1 children
}

GlobalStyles.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalStyles;
