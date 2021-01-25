import {
  FETCH_DATA_BEGIN,
  FETCH_DATA_FAILURE,
  FETCH_DATA_SUCCESS,
  SET_FEATURE,
  SET_INDEX,
  UPDATE_DATA,
  UPDATE_FEATURE
} from '../actions/dataActions';

const initialState = {
  data: { features: [] },
  feature: null,
  loading: true,
  error: null,
  fileName: '',
  index: 0,
  totalFeatures: 0
};

export default function dataReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DATA_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.fData,
        fileName: action.payload.fileName,
        totalFeatures: action.payload.totalFeatures
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        data: {}
      };
    case SET_INDEX:
      return {
        ...state,
        index: action.payload.index
      };
    case SET_FEATURE:
      return {
        ...state,
        feature: action.payload.feature
      };
    case UPDATE_DATA:
      return {
        ...state,
        data: action.payload.fData
      };
    case UPDATE_FEATURE:
      return {
        ...state,
        feature: action.payload.feature
      };
    default:
      return state;
  }
}
