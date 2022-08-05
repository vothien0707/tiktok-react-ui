import config from '@/config';
import classNames from 'classnames/bind';

import Menu, { MenuItem } from './Menu';
import {
  HomeIcon,
  UserGroupIcon,
  LiveIcon,
  HomeActiveIcon,
  UserGroupActiveIcon,
  LiveActiveIcon,
} from '@/components/icons';

import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

function Sidebar() {
  return (
    <aside className={cx('wrapper')}>
      <Menu>
        <MenuItem
          icon={<HomeIcon />}
          activeIcon={<HomeActiveIcon />}
          title="For You"
          to={config.routesConfig.home}
        />
        <MenuItem
          icon={<UserGroupIcon />}
          activeIcon={<UserGroupActiveIcon />}
          title="Following"
          to={config.routesConfig.following}
        />
        <MenuItem
          icon={<LiveIcon />}
          activeIcon={<LiveActiveIcon />}
          title="LIVE"
          to={config.routesConfig.live}
        />
      </Menu>
    </aside>
  );
}

export default Sidebar;
