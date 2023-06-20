import axios from 'axios';

import { decodeToken, object2list } from '../utils/utils';
const { REACT_APP_API_URL } = process.env;
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
    payload: { token_url, token_url_decode, task_id }
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
      dispatch(fetchSetupToolFailure());
      return;
    }
    dispatch(getTokenUrlSuccess(token_url, { ...token }, token.task_id));
    dispatch(fetchSetupTool(token.task_id));
  };
}

// classes annotate

export const FETCH_SETUP_TOOL_BEGIN = 'FETCH_SETUP_TOOL_BEGIN';
export const FETCH_SETUP_TOOL_SUCCESS = 'FETCH_SETUP_TOOL_SUCCESS';
export const FETCH_SETUP_TOOL_FAILURE = 'FETCH_SETUP_TOOL_FAILURE';

export const fetchSetupToolBegin = () => ({
  type: FETCH_SETUP_TOOL_BEGIN
});

export const fetchSetupToolSuccess = (setupParams) => {
  const classes_annotate = object2list(setupParams.classes_annotate_dict);
  return {
    type: FETCH_SETUP_TOOL_SUCCESS,
    payload: { ...setupParams, classes_annotate }
  };
};

export const fetchSetupToolFailure = () => ({
  type: FETCH_SETUP_TOOL_FAILURE
});

export function fetchSetupTool(task_id) {
  return (dispatch) => {
    dispatch(fetchSetupToolBegin());
    axios
      .get(`${REACT_APP_API_URL}/${task_id}/get_project_setup`)
      .then(function (response) {
        dispatch(fetchSetupToolSuccess({ ...response.data }));
        dispatch(setAccess());
      })
      .catch(function (error) {
        console.error(error);
        dispatch(fetchSetupToolFailure());
        dispatch(removeAccess());
      });
  };
}
