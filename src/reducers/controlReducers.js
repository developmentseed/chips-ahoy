import { DOWNLOAD_FILE } from '../actions/controlAction';

const initialState = {
  downloadFile: false
};

export default function dataReducer(state = initialState, action) {
  switch (action.type) {
    case DOWNLOAD_FILE:
      return {
        ...state,
        downloadFile: action.payload.download
      };
    default:
      return state;
  }
}
