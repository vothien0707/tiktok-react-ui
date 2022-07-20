import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

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
      {leftIcon && (
        <span className={cx('icon')}>
          <FontAwesomeIcon icon={faPlus} />
        </span>
      )}
      <span className={cx('title')}>{children}</span>
      {rightIcon && (
        <span className={cx('icon')}>
          <FontAwesomeIcon icon={faPlus} />
        </span>
      )}
    </Component>
  );
}

export default Button;
