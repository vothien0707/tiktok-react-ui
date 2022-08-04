import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuHeader({ title, onBack }) {
  return (
    <header className={cx('menu-header')}>
      <button className={cx('menu-header__back')} onClick={onBack}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      <h4 className={cx('menu-header__title')}>{title}</h4>
    </header>
  );
}

MenuHeader.propTypes = {
  title: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default MenuHeader;
