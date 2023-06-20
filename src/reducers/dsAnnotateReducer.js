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
  classes_annotate_dict: {
    vacant_lots: [
      'paved',
      'unpaved',
      'overgrown_lawn',
      'overgrown_shrubbery_trees',
      'fenced',
      'litter_dumping_tires'
    ],
    structures: [
      'damaged_roof',
      'broken_missing_windows_doors',
      'boarded_up_windows_doors',
      'overgrown_lawn',
      'overgrown_shrubbery_trees',
      'structural_issues',
      'faded_paint',
      'litter_in_around_structure'
    ]
  },
  classes_annotate: [
    'prop_feature__structures__damaged_roof',
    'prop_feature__structures__broken_missing_windows_doors',
    'prop_feature__structures__boarded_up_windows_doors',
    'prop_feature__structures__overgrown_lawn',
    'prop_feature__structures__overgrown_shrubbery_trees',
    'prop_feature__structures__structural_issues',
    'prop_feature__structures__faded_paint',
    'prop_feature__structures__litter_in_around_structure',
    'prop_feature__vacant_lots__paved',
    'prop_feature__vacant_lots__unpaved',
    'prop_feature__vacant_lots__overgrown_lawn',
    'prop_feature__vacant_lots__overgrown_shrubbery_trees',
    'prop_feature__vacant_lots__fenced',
    'prop_feature__vacant_lots__litter_dumping_tires'
  ],
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
