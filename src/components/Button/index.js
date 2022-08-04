import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import classNames from 'classnames/bind';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
  to,
  href,
  primary = false,
  outline = false,
  upload = false,
  rounded = false,
  leftIcon,
  rightIcon,
  disabled = false,
  small = false,
  large = false,
  children,
  className,
  onClick,
  ...passProps
}) {
  let Component = 'button';
  const props = {
    onClick,
    ...passProps,
  };

  // when button disabled then remove all event listener of the button
  if (disabled) {
    Object.keys(props).forEach((key) => {
      if (key.startsWith('on') && typeof props[key] === 'function') {
        delete props[key];
      }
    });
  }

  if (to) {
    props.to = to;
    Component = Link;
  } else if (href) {
    props.href = href;
    Component = 'a';
  }

  const classes = cx('wrapper', {
    [className]: className,
    primary,
    outline,
    upload,
    rounded,
    disabled,
    small,
    large,
  });

  return (
    <Component className={classes} {...props}>
      {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
      <span className={cx('title')}>{children}</span>
      {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
    </Component>
  );
}

Button.propTypes = {
  to: PropTypes.string,
  href: PropTypes.string,
  primary: PropTypes.bool,
  outline: PropTypes.bool,
  upload: PropTypes.bool,
  rounded: PropTypes.bool,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  disabled: PropTypes.bool,
  small: PropTypes.bool,
  large: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
