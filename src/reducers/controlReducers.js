import {
  DOWNLOAD_FILE_FAILED,
  DOWNLOAD_FILE_RESTART,
  DOWNLOAD_FILE_SUCCESS
} from '../actions/controlAction';

const initialState = {
  downloadFile: false,
  saveApiFile: false
};

export default function dataReducer(state = initialState, action) {
  switch (action.type) {
    case DOWNLOAD_FILE_RESTART:
      return {
        ...state,
        downloadFile: false
      };
    case DOWNLOAD_FILE_FAILED:
      return {
        ...state,
        downloadFile: false
      };
    case DOWNLOAD_FILE_SUCCESS:
      return {
        ...state,
        downloadFile: true
      };
    default:
      return state;
  }
}
