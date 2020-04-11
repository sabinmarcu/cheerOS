import React, { useState, useMemo, useCallback } from 'react';

import {
  useHistory,
} from 'react-router-dom';

import {
  routes
} from '../../config/routes';

import {
  CenterLayout
} from '../../components/Layout';

import {
  Button,
  CardContent,
  Snackbar,
  IconButton,
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

import {
  StyledCard,
  StyledTypography,
  StyledTextField,
  StyledCardActions,
} from './styles';

import {
  useField,
  ValidatorType,
} from '@cheeros/hooks/useField';

import {
  useAdminLogin,
} from '@cheeros/stores';

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const minLengthValidator = (len: number): ValidatorType =>
  (value) => {
    if (value.length < len) {
      return 'Email is too short';
    }
  }
const maxLengthValidator = (len: number): ValidatorType =>
  (value) => {
    if (value.length > len) {
      return 'Email is too short';
    }
  }

const emailValidators: ValidatorType[] = [
  minLengthValidator(1),
  (value) => {
    if (!emailRegex.test(value)) {
      return 'Email is invalid';
    }
  },
];
const passwordValidators: ValidatorType[] = [
  minLengthValidator(6),
  maxLengthValidator(60),
]

export const LoginScreen: React.FC = () => {
  const history = useHistory();
  const email = useField({
    validators: emailValidators,
  });
  const password = useField({
    validators: passwordValidators,
  });
  const isValid = useMemo(
    () => [email, password].reduce((prev, it) => it.isValid && prev, true),
    [email, password]
  );
  const isDirty = useMemo(
    () => [email, password].reduce((prev, it) => it.isDirty || prev, false),
    [email, password]
  );
  const reset = useCallback(
    () => [email, password].forEach(it => it.reset()),
    [email, password]
  );
  const [login, isLoginReady] = useAdminLogin();
  const [error, setError] = useState<string | null>(null);
  const closeError = useCallback(
    () => setError(null),
    [setError],
  );

  const loginHandler = useCallback(
    () => {
      if (login) {
        setError(null);
        login(email.value, password.value)
          .then(() => history.push(routes.root.route))
          .catch(({ message }: { message: string }) => setError(message))
      }
    },
    [login, email.value, password.value, history, setError],
  );
  return (
    <>
      <CenterLayout>
        <StyledCard>
          <CardContent>
            <StyledTypography variant="h2">Login:</StyledTypography>
            <StyledTextField
              required
              fullWidth
              value={email.value}
              error={email.isDirty && !email.isValid}
              helperText={email.isDirty && email.errors.length > 0 ? email.errors[0] : undefined}
              onChange={email.handler}
              placeholder="leroy@jenkins.com"
              type="email"
            />
            <StyledTextField
              required
              fullWidth
              value={password.value}
              error={password.isDirty && !password.isValid}
              helperText={password.isDirty && password.errors.length > 0 ? password.errors[0] : undefined}
              onChange={password.handler}
              placeholder="test1234"
              type="password"
            />
          </CardContent>
          <StyledCardActions>
            <Button
              color="primary"
              variant="contained"
              onClick={loginHandler}
              disabled={!isValid || !isLoginReady}
            >
              Login!
            </Button>
            {isDirty && <Button color="secondary" onClick={reset}>Reset</Button>}
          </StyledCardActions>
        </StyledCard>
      </CenterLayout>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={closeError}
        message={error}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        action={
          <IconButton onClick={closeError}>
            <CloseIcon style={{ color: 'white' }} />
          </IconButton>
        }
      />
    </>
  )
};

export default LoginScreen;
