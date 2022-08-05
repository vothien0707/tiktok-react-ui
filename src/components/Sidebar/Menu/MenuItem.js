import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import classNames from 'classnames/bind';

import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ icon, activeIcon, title, to }) {
  return (
    <NavLink
      to={to}
      className={(nav) => cx('menu-item', { active: nav.isActive })}
    >
      <span className={cx('icon')}>{icon}</span>
      <span className={cx('active-icon')}>{activeIcon}</span>
      <span className={cx('menu-item__title')}>{title}</span>
    </NavLink>
  );
}

MenuItem.propTypes = {
  icon: PropTypes.node.isRequired,
  activeIcon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default MenuItem;
