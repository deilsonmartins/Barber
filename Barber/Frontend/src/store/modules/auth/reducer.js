import produce from 'immer';
import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCESS,
  SIGN_FAILURE,
  SIGN_OUT,
} from '../actionsTypes';

const INITIAL_STATE = {
  token: null,
  signed: false,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case SIGN_IN_SUCESS:
        draft.token = action.payload.token;
        draft.signed = true;
        draft.loading = false;
        break;

      case SIGN_IN_REQUEST:
        draft.loading = true;
        break;

      case SIGN_FAILURE:
        draft.loading = false;
        break;

      case SIGN_OUT:
        draft.token = null;
        draft.signed = false;
        break;
      default:
        return state;
    }
  });
}
