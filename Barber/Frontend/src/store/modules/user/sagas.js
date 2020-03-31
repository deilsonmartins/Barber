import { all, takeLeading, call, put } from 'redux-saga/effects';

import { toast } from 'react-toastify';

import api from '../../../services/api';

import { UPDATE_PROFILE_REQUEST } from '../actionsTypes';

import { updateProfileSucess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
  try {
    const { nome, email, ...rest } = payload.data;

    const { senhaAntiga, novaSenha, confirmacaoSenha } = {
      nome,
      email,
      ...(rest.senhaAntiga ? rest : {}),
    };

    const response = yield call(api.post, 'update', {
      nome,
      email,
      senhaAntiga,
      novaSenha,
      confirmacaoSenha,
      prestador: true,
    });

    toast.success('Perfil atualizado com sucesso');

    yield put(updateProfileSucess(response.data));
  } catch (err) {
    yield put(updateProfileFailure());
    toast.error('Atualização negada, verifique os seus dados');
  }
}
export default all([takeLeading(UPDATE_PROFILE_REQUEST, updateProfile)]);
