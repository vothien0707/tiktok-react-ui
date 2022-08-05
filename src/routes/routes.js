import config from '@/config';

import Home from '@/pages/Home';
import Following from '@/pages/Following';
import Profile from '@/pages/Profile';
import Upload from '@/pages/Upload';
import Search from '@/pages/Search';
import Live from '@/pages/Live';

import { OnlyHeaderLayout } from '@/layouts';

const publicRoutes = [
  {
    path: config.routesConfig.home,
    component: Home,
  },
  {
    path: config.routesConfig.following,
    component: Following,
  },
  {
    path: config.routesConfig.profile,
    component: Profile,
  },
  {
    path: config.routesConfig.upload,
    component: Upload,
    layout: OnlyHeaderLayout,
  },
  {
    path: config.routesConfig.search,
    component: Search,
    layout: null,
  },
  {
    path: config.routesConfig.live,
    component: Live,
  },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
