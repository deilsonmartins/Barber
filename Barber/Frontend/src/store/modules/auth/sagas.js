import { call, put, all, takeLeading } from 'redux-saga/effects';

import { toast } from 'react-toastify';

import { SIGN_IN_REQUEST, SIGN_UP_REQUEST, SIGN_OUT } from '../actionsTypes';

import api from '../../../services/api';

import { signInSucess, signFailure } from './actions';

import history from '../../../services/history';

export function* signIn({ payload }) {
  try {
    const { email, senha } = payload;

    const response = yield call(api.post, 'sessao', {
      email,
      senha,
    });

    const { token, usuario } = response.data;

    const _token = token.token;

    if (!usuario.prestador) {
      toast.error('Usuario não é prestador');
    }

    api.defaults.headers.Authorization = `${_token}`;

    yield put(signInSucess(_token, usuario));

    history.push('/dashboard');
  } catch (err) {
    yield put(signFailure());
    toast.error('Acesso negado, verifique os seus dados');
  }
}

export function* signUp({ payload }) {
  try {
    const { nome, email, senha } = payload;

    yield call(api.post, 'usuarios', {
      nome,
      email,
      senha,
      prestador: true,
    });

    toast.success('Cadastro realizado com sucesso');
    history.push('/');
  } catch (err) {
    toast.error('Cadastro negado, tente novamente');
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `${token}`;
  }
}

export function signOut() {
  history.push('/');
}

export default all([
  takeLeading('persist/REHYDRATE', setToken),
  takeLeading(SIGN_IN_REQUEST, signIn),
  takeLeading(SIGN_UP_REQUEST, signUp),
  takeLeading(SIGN_OUT, signOut),
]);
