import { HomeScreen } from '../screens/Home';
import { LoginScreen } from '../screens/Login';
import { ErrorScreen } from'../screens/Error';

import { ContactsCrud } from '../screens/ContactsCrud';

import { PhoneContactsList } from '../screens/ContactsList';

import { withAuthGuard, RoutesGenericType, RoutesType } from '@cheeros/stores/auth';

export const errors: RoutesGenericType = {
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

export const adminRoutes: RoutesGenericType = {
  root: {
    name: 'Home Screen',
    route: '/',
    hide: false,
    component: HomeScreen,
  },
  contactsCrud: {
    name: 'Contacts',
    route: '/crud/contacts',
    hide: false,
    component: withAuthGuard({ redirect: errors['403'].route })(ContactsCrud),
  },
};

export const phoneRoutes: RoutesGenericType = {
  contacts: {
    name: 'Contacts',
    route: '/phone/contacts',
    hide: false,
    component: withAuthGuard({ redirect: errors['403'].route })(PhoneContactsList),
  },
}

export const routes: RoutesType = ({
  login: {
    name: 'Login',
    route: '/login',
    hide: true,
    component: withAuthGuard({ requiresLogin: false, redirect: errors['403'].route })(LoginScreen),
  },
  ...phoneRoutes,
  ...adminRoutes,
} as RoutesType)

export default routes;
