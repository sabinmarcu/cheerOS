import { HomeScreen } from '../screens/Home';
import { LoginScreen } from '../screens/Login';

export const routes = {
  root: {
    name: 'Home Screen',
    route: '/',
    component: HomeScreen,
  },
  login: {
    name: 'Login',
    route: '/login',
    component: LoginScreen,
  },

};

export default routes;
