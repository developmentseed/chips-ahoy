import {
  FETCH_SETUP_TOOL_BEGIN,
  FETCH_SETUP_TOOL_FAILURE,
  FETCH_SETUP_TOOL_SUCCESS,
  GET_TOKEN_URL,
  GET_TOKEN_URL_EMPTY,
  GET_TOKEN_URL_FAILURE,
  GET_TOKEN_URL_SUCCESS,
  REMOVE_ACCESS,
  SET_ACCESS
} from '../actions/dsAnnotate';

const setup_tool = {
  can_load_data: false,
  can_download_data: false,
  fetch_data: false
};

const initialState = {
  token_url: '',
  token_url_decode: {},
  setup_tool: { ...setup_tool },
  classes_annotate_dict: {},
  classes_annotate: [],
  is_geo: false,
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
    case FETCH_SETUP_TOOL_BEGIN:
      return {
        ...state
      };
    case FETCH_SETUP_TOOL_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case FETCH_SETUP_TOOL_FAILURE:
      return {
        ...state,
        setup_tool: { ...setup_tool },
        classes_annotate_dict: {},
        classes_annotate: [],
        is_geo: false
      };
    default:
      return state;
  }
}
