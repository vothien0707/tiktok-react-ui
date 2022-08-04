import { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import { wrapper as DropdownWrapper } from '@/components/Dropdown';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';
import MenuHeader from './MenuHeader';

const cx = classNames.bind(styles);

const defaultFunctions = () => {}; // Mac dinh khi khong truyen props onSelect

function Menu({
  menuItems = [],
  hideOnClick = false,
  children,
  onSelect = defaultFunctions,
}) {
  const [history, setHistory] = useState([{ data: menuItems }]);
  const current = history[history.length - 1];

  const renderMenuItems = () => {
    return current.data.map((menuItem, index) => {
      const isParent = !!menuItem.children;
      return (
        <MenuItem
          key={index}
          data={menuItem}
          onClick={() => {
            // check exist: children
            if (isParent) {
              setHistory((prevState) => [...prevState, menuItem.children]);
            } else {
              onSelect(menuItem);
            }
          }}
        />
      );
    });
  };

  const handleBackMenu = () => {
    setHistory((prevState) => prevState.slice(0, prevState.length - 1));
  };

  const renderDropdownMenu = (attrs) => (
    <div className={cx('menu')} tabIndex="-1" {...attrs}>
      <DropdownWrapper className={cx('menu-wrapper')}>
        {history.length > 1 && (
          <MenuHeader title={current.title} onBack={handleBackMenu} />
        )}
        <div className={cx('menu-content')}>{renderMenuItems()}</div>
      </DropdownWrapper>
    </div>
  );

  const handleResetToFirstMenu = () => {
    setHistory((prevState) => prevState.slice(0, 1));
  };

  return (
    <Tippy
      interactive
      placement="bottom-end"
      delay={[0, 600]} //[show, hide]/ms
      offset={[20, 10]}
      hideOnClick={hideOnClick}
      render={renderDropdownMenu}
      onHide={handleResetToFirstMenu}
    >
      {children}
    </Tippy>
  );
}

Menu.propTypes = {
  menuItems: PropTypes.array,
  hideOnClick: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onSelect: PropTypes.func,
};

export default Menu;
