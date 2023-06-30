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
} from '../actions/annotationSeed';

const setup_tool = {
  can_load_data: false,
  can_download_data: false,
  fetch_data: false
};
const setup_data = {
  format: 'geojson',
  extension: 'geojson',
  fieldProperties: 'properties',
  geojsonMetadara: {
    crs: { type: 'name', properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' } }
  }
};

const initialState = {
  token_url: '',
  token_url_decode: {},
  setup_tool: { ...setup_tool },
  setup_data: { ...setup_data },
  classes_annotate_dict: {},
  classes_annotate: [],
  classes_annotate_setup: {},
  is_geo: false,
  task_id: '',
  user_data: {},
  has_access: false
};

export default function annotationSeedReducer(state = initialState, action) {
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
        setup_data: { ...setup_data },
        classes_annotate_dict: {},
        classes_annotate: [],
        is_geo: false
      };
    default:
      return state;
  }
}
