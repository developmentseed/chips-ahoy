import {
  GET_TOKEN_URL,
  GET_TOKEN_URL_EMPTY,
  GET_TOKEN_URL_FAILURE,
  GET_TOKEN_URL_SUCCESS,
  SET_ACCESS,
  REMOVE_ACCESS,
  SETUP_TOOL,
  RESET_TOOL
} from '../actions/dsAnnotate';

const setup_tool = {
  can_load_data: false,
  can_download_data: false,
  fetch_data: true
};

const initialState = {
  token_url: '',
  token_url_decode: {},
  setup_tool: { ...setup_tool },
  task_id: '',
  user_data: {},
  has_access: false
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
    case SET_ACCESS:
      return {
        ...state,
        has_access: true
      };
    case REMOVE_ACCESS:
      return {
        ...state,
        has_access: false
      };
    case SETUP_TOOL:
      return {
        ...state,
        setup_tool: { ...state.payload }
      };
    case RESET_TOOL:
      return {
        ...state,
        setup_tool: { ...setup_tool }
      };
    default:
      return state;
  }
}
