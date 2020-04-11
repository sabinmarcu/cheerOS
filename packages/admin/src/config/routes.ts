import { HomeScreen } from '../screens/Home';
import { LoginScreen } from '../screens/Login';
import { TestScreen } from '../screens/TestLogin';
import { ErrorScreen } from'../screens/Error';

import { PhoneContactsList } from '../screens/ContactsList';

import { withAuthGuard } from '@cheeros/stores/auth';

export const errors = {
  404: {
    name: 'Error',
    code: 404,
    text: 'This page doesn\'t exist!',
    route: '/404',
    component: ErrorScreen,
  },
  403: {
    name: 'Error',
    code: 403,
    text: 'You\'re not allowed to view this page!',
    route: '/403',
    component: ErrorScreen,
  },
  418: {
    name: 'Error',
    code: 418,
    text: 'I\'m a teapot!',
    route: '/418',
    component: ErrorScreen,
  }
}

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
    component: withAuthGuard({ requiresLogin: false, redirect: errors['403'].route })(LoginScreen),
  },
  test: {
    name: 'Test Screen',
    route: '/test',
    hide: false,
    component: withAuthGuard({ redirect: errors['403'].route })(TestScreen),
  },
  phoneContacts: {
    name: 'Phone Contacts',
    route: '/phone/contacts',
    hide: false,
    component: PhoneContactsList
    // component: withAuthGuard({ redirect: errors['403'].route })(PhoneContactsList),
  },
};

export default routes;
