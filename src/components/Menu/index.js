import { useState } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import { wrapper as DropdownWrapper } from '@/components/Dropdown';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';
import MenuHeader from './MenuHeader';

const cx = classNames.bind(styles);

const defaultFunctions = () => {}; // Mac dinh khi khong truyen props onSelect

function Menu({ menuItems = [], children, onSelect = defaultFunctions }) {
  const [history, setHistory] = useState([{ data: menuItems }]);
  const current = history[history.length - 1];

  const renderMenuItems = () => {
    return current.data.map((menuItem, index) => {
      const isParrent = !!menuItem.children;

      return (
        <MenuItem
          key={index}
          data={menuItem}
          onClick={() => {
            // check exist: children
            if (isParrent) {
              setHistory((prevState) => [...prevState, menuItem.children]);
            } else {
              onSelect(menuItem);
            }
          }}
        />
      );
    });
  };

  return (
    <Tippy
      visible
      interactive
      placement="bottom-end"
      delay={[0, 600]} //[show, hide]/ms
      render={(attrs) => (
        <div className={cx('menu')} tabIndex="-1" {...attrs}>
          <DropdownWrapper className={cx('menu-wrapper')}>
            {history.length > 1 && (
              <MenuHeader
                title={current.title}
                onBack={() => {
                  setHistory((prevState) =>
                    prevState.slice(0, prevState.length - 1),
                  );
                }}
              />
            )}
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
