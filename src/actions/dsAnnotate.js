import { decodeToken } from '../utils/utils';

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
      return;
    }
    dispatch(getTokenUrlSuccess(token_url, { ...token }));
  };
}
