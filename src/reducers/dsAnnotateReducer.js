import {
  GET_TOKEN_URL,
  GET_TOKEN_URL_EMPTY,
  GET_TOKEN_URL_FAILURE,
  GET_TOKEN_URL_SUCCESS
} from '../actions/dsAnnotate';

const initialState = {
  token_url: '',
  token_url_decode: {}
};

export default function dsAnnotateReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TOKEN_URL:
      return {
        ...state,
        token_url: '',
        token_url_decode: {}
      };
    case GET_TOKEN_URL_EMPTY:
      return {
        ...state
      };
    case GET_TOKEN_URL_FAILURE:
      return {
        ...state,
        token_url: '',
        token_url_decode: {}
      };
    case GET_TOKEN_URL_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
