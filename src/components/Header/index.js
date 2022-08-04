import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisVertical,
  faPlus,
  faGlobe,
  faCircleQuestion,
  faKeyboard,
  faSquareArrowUpRight,
  faCommentDots,
  faUser,
  faCoins,
  faGear,
  faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import Search from '@/components/Search';
import Button from '@/components/Button';
import Menu from '@/components/Menu';

import config from '@/config';
import Image from '@/components/Image';
import images from '@/assets/images';
import styles from './Header.module.scss';

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

const LOGIN__MENU__ITEMS = [
  {
    icon: <FontAwesomeIcon icon={faUser} />,
    title: 'View profile',
    to: '/profile',
  },
  {
    icon: <FontAwesomeIcon icon={faCoins} />,
    title: 'Get coins',
    to: '/coin',
  },
  {
    icon: <FontAwesomeIcon icon={faGear} />,
    title: 'Settings',
    to: '/settings',
  },
  ...MENU__ITEMS,
  {
    icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
    title: 'Log out',
    to: '/logout',
    separate: true,
  },
];

function Header() {
  const isLogin = true;

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
        <Link to={config.routesConfig.home}>
          <img src={images.logo} alt="logo" />
        </Link>

        <Search />

        <div className={cx('action')}>
          <Button outline upload leftIcon={<FontAwesomeIcon icon={faPlus} />}>
            Upload
          </Button>

          {isLogin ? (
            <>
              <Tippy content="Messages" placement="bottom" delay={[0, 200]}>
                <button className={cx('action__message')}>
                  <FontAwesomeIcon icon={faSquareArrowUpRight} />
                </button>
              </Tippy>
              <Tippy content="Inbox" placement="bottom">
                <button className={cx('action__inbox')}>
                  <FontAwesomeIcon icon={faCommentDots} />
                </button>
              </Tippy>
            </>
          ) : (
            <Button primary>Log in</Button>
          )}

          <Menu
            menuItems={isLogin ? LOGIN__MENU__ITEMS : MENU__ITEMS}
            onSelect={handleMenuSelect}
          >
            {isLogin ? (
              <Image
                src={images.avatar}
                alt="user name"
                className={cx('action__avatar')}
              />
            ) : (
              <button className={cx('action__more')}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            )}
          </Menu>
        </div>
      </div>
    </header>
  );
}

export default Header;
