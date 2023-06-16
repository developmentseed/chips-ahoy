import { decodeToken } from '../utils/utils';

// token url
export const GET_TOKEN_URL = 'GET_TOKEN_URL';
export const GET_TOKEN_URL_EMPTY = 'GET_TOKEN_URL_EMPTY';
export const GET_TOKEN_URL_SUCCESS = 'GET_TOKEN_URL_SUCCESS';
export const GET_TOKEN_URL_FAILURE = 'GET_TOKEN_URL_FAILURE';
// setup tool
// access tool
export const SET_ACCESS = 'SET_ACCESS';
export const REMOVE_ACCESS = 'REMOVE_ACCESS';

export const getTokenUrl = () => ({
  type: GET_TOKEN_URL
});

export const getTokenUrlFailure = () => ({
  type: GET_TOKEN_URL_FAILURE
});
export const getTokenUrlEmpty = () => ({
  type: GET_TOKEN_URL_EMPTY
});

export const getTokenUrlSuccess = (token_url, token_url_decode) => {
  return {
    type: GET_TOKEN_URL_SUCCESS,
    payload: { token_url, token_url_decode }
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

      return;
    }
    dispatch(getTokenUrlSuccess(token_url, { ...token }));
    dispatch(setAccess());
  };
}

// fetch data
// fetch project config
export const setAccess = () => ({
  type: SET_ACCESS
});
export const removeAccess = () => ({
  type: REMOVE_ACCESS
});
