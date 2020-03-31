import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCESS,
  SIGN_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_OUT,
} from '../actionsTypes';

export function signInRequest(email, senha) {
  return {
    type: SIGN_IN_REQUEST,
    payload: { email, senha },
  };
}

export function signInSucess(token, usuario) {
  return {
    type: SIGN_IN_SUCESS,
    payload: { token, usuario },
  };
}

export function signFailure() {
  return {
    type: SIGN_FAILURE,
  };
}

export function signUpRequest(nome, email, senha) {
  return {
    type: SIGN_UP_REQUEST,
    payload: { nome, email, senha },
  };
}

export function signOut() {
  return {
    type: SIGN_OUT,
  };
}
