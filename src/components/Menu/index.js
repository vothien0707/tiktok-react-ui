import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import { wrapper as DropdownWrapper } from '@/components/Dropdown';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';

const cx = classNames.bind(styles);

function Menu({ menuItems = [], children }) {
  const renderMenuItems = () => {
    return menuItems.map((menuItem, index) => (
      <MenuItem key={index} data={menuItem} />
    ));
  };

  return (
    <Tippy
      interactive
      placement="bottom-end"
      delay={[0, 600]} //[show, hide]/ms
      render={(attrs) => (
        <div className={cx('menu')} tabIndex="-1" {...attrs}>
          <DropdownWrapper className={cx('menu-wrapper')}>
            {renderMenuItems()}
          </DropdownWrapper>
        </div>
      )}
    >
      {children}
    </Tippy>
  );
}

export default Menu;
