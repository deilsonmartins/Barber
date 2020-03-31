import produce from 'immer';
import {
  SIGN_IN_SUCESS,
  UPDATE_PROFILE_SUCESS,
  SIGN_OUT,
  UPDATE_AVATAR_URL,
} from '../actionsTypes';

const INITIAL_STATE = {
  profile: null,
  avatar_url: null,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case SIGN_IN_SUCESS:
        draft.profile = action.payload.usuario;
        break;

      case UPDATE_PROFILE_SUCESS:
        draft.profile = action.payload.profile;
        break;

      case UPDATE_AVATAR_URL:
        draft.avatar_url = action.payload.avatar_url;

        break;
      case SIGN_OUT:
        draft.profile = null;

        break;
      default:
    }
  });
}
