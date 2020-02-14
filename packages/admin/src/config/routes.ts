import { HomeScreen } from '../screens/Home';
import { LoginScreen } from '../screens/Login';
import { TestScreen } from '../screens/TestLogin';

import { withAuthGuard } from '@cheeros/stores/auth';

export const routes = {
  root: {
    name: 'Home Screen',
    route: '/',
    hide: false,
    component: HomeScreen,
  },
  login: {
    name: 'Login',
    route: '/login',
    hide: true,
    component: withAuthGuard({requiresLogin: false})(LoginScreen),
  },
  test: {
    name: 'Test Screen',
    route: '/test',
    hide: false,
    component: withAuthGuard({})(TestScreen),
  },
};

export default routes;
