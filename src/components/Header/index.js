import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleXmark,
  faSpinner,
  faMagnifyingGlass,
  faEllipsisVertical,
  faPlus,
  faGlobe,
  faCircleQuestion,
  faKeyboard,
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import styles from './Header.module.scss';
import images from '@/assets/images';
import { wrapper as DropdownWrapper } from '@/components/Dropdown';
import AccountItem from '@/components/AccountItem';
import Button from '@/components/Button';
import Menu from '@/components/Menu';

const cx = classNames.bind(styles);

const MENU__ITEMS = [
  {
    icon: <FontAwesomeIcon icon={faGlobe} />,
    title: 'English',
    // sub menu
    children: {
      title: 'Language',
      data: [
        {
          type: 'language',
          code: 'en',
          title: 'English',
        },
        {
          type: 'language',
          code: 'vi',
          title: 'Tiếng Việt',
        },
        {
          type: 'language',
          code: 'fr',
          title: 'French',
        },
        {
          type: 'language',
          code: 'ja',
          title: 'Japanese',
        },
        {
          type: 'language',
          code: 'it',
          title: 'Italian',
        },
        {
          type: 'language',
          code: 'es',
          title: 'Spanish',
        },
      ],
    },
  },
  {
    icon: <FontAwesomeIcon icon={faCircleQuestion} />,
    title: 'Feedback and help',
    to: '/help',
  },
  {
    icon: <FontAwesomeIcon icon={faKeyboard} />,
    title: 'Keyboard shortcuts',
  },
];

function Header() {
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setSearchResult([]);
    }, 0);
  }, []);

  const handleMenuSelect = (menuItem) => {
    switch (menuItem.type) {
      case 'language':
        console.log(menuItem);
        break;
      default:
        console.log('Not exist type for menuItem');
    }
  };

  return (
    <header className={cx('wrapper')}>
      <div className={cx('content')}>
        <img src={images.logo} alt="logo" />
        <Tippy
          interactive
          visible={searchResult.length > 0}
          render={(attrs) => (
            <div className={cx('search-result')} tabIndex="-1" {...attrs}>
              <DropdownWrapper>
                <h4 className={cx('search-result__title')}>Accounts</h4>
                <AccountItem />
                <AccountItem />
                <AccountItem />
              </DropdownWrapper>
            </div>
          )}
        >
          <div className={cx('search')}>
            <input
              placeholder="Search accounts and videos"
              spellCheck={false}
            />
            <button className={cx('search__clear')}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
            <FontAwesomeIcon
              className={cx('search__loading')}
              icon={faSpinner}
            />
            <button className={cx('search__button')}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </Tippy>
        <div className={cx('action')}>
          <Button outline upload leftIcon={<FontAwesomeIcon icon={faPlus} />}>
            Upload
          </Button>
          <Button primary>Log in</Button>
          <Menu menuItems={MENU__ITEMS} onSelect={handleMenuSelect}>
            <button className={cx('action__more')}>
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </button>
          </Menu>
        </div>
      </div>
    </header>
  );
}

export default Header;
