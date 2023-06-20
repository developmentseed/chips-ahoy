import { decodeToken } from '../utils/utils';

// access tool
export const SET_ACCESS = 'SET_ACCESS';
export const REMOVE_ACCESS = 'REMOVE_ACCESS';

export const setAccess = () => ({
  type: SET_ACCESS
});
export const removeAccess = () => ({
  type: REMOVE_ACCESS
});
// token url
export const GET_TOKEN_URL = 'GET_TOKEN_URL';
export const GET_TOKEN_URL_EMPTY = 'GET_TOKEN_URL_EMPTY';
export const GET_TOKEN_URL_SUCCESS = 'GET_TOKEN_URL_SUCCESS';
export const GET_TOKEN_URL_FAILURE = 'GET_TOKEN_URL_FAILURE';

export const getTokenUrl = () => ({
  type: GET_TOKEN_URL
});

export const getTokenUrlFailure = () => ({
  type: GET_TOKEN_URL_FAILURE
});
export const getTokenUrlEmpty = () => ({
  type: GET_TOKEN_URL_EMPTY
});

export const getTokenUrlSuccess = (token_url, token_url_decode, task_id) => {
  return {
    type: GET_TOKEN_URL_SUCCESS,
    payload: { token_url, token_url_decode , task_id }
  };
};

export function tokeUrl(token_url) {
  return (dispatch) => {
    if (!token_url) {
      dispatch(getTokenUrlEmpty());
      return;
    }
    dispatch(getTokenUrl());
    const token = decodeToken(token_url);
    if (!token) {
      dispatch(getTokenUrlFailure());
      dispatch(removeAccess());
      dispatch(resetTool());
      return;
    }
    dispatch(getTokenUrlSuccess(token_url, { ...token }, token.task_id));
    dispatch(setAccess());

  };
}

// access tool
export const SETUP_TOOL = 'SETUP_TOOL';
export const RESET_TOOL = 'REMOVE_ACCESS';

export const setupTool = (data) => ({
  type: SETUP_TOOL,
  payload: data
});
export const resetTool = () => ({
  type: RESET_TOOL
});

// 