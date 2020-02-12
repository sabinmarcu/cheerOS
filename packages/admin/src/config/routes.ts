import { HomeScreen } from '../screens/Home';
import { LoginScreen } from '../screens/Login';
import { withScreenWrapper } from '../components/Screen';

export const routes = {
  root: {
    name: 'Home Screen',
    route: '/',
    component: withScreenWrapper(HomeScreen),
  },
  login: {
    name: 'Login',
    route: '/login',
    component: withScreenWrapper(LoginScreen),
  },

};

export default routes;
