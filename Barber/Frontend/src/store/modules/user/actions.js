import {
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCESS,
  UPDATE_PROFILE_FAILURE,
  UPDATE_AVATAR_URL,
} from '../actionsTypes';

export function updateProfileRequest(data) {
  return {
    type: UPDATE_PROFILE_REQUEST,
    payload: { data },
  };
}

export function updateProfileSucess(profile) {
  return {
    type: UPDATE_PROFILE_SUCESS,
    payload: { profile },
  };
}

export function updateProfileFailure() {
  return {
    type: UPDATE_PROFILE_FAILURE,
  };
}

export function updateAvatar(avatar_url) {
  return {
    type: UPDATE_AVATAR_URL,
    payload: { avatar_url },
  };
}
