import { validateFileName } from '../utils/validate';

export const FETCH_DATA_BEGIN = 'FETCH_DATA_BEGIN';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';
export const SET_INDEX = 'SET_INDEX';
export const SET_FEATURE = 'SET_FEATURE';

export const fetchDataBegin = () => ({
  type: FETCH_DATA_BEGIN
});

export const fetchDataSuccess = (fData, fileName, totalFeatures) => {
  return {
    type: FETCH_DATA_SUCCESS,
    payload: { fData, fileName, totalFeatures }
  };
};

export const fetchDataFailure = (error) => ({
  type: FETCH_DATA_FAILURE,
  payload: { error }
});

export const setIndex = (index) => ({
  type: SET_INDEX,
  payload: { index }
});

export const setFeature = (feature) => ({
  type: SET_FEATURE,
  payload: { feature }
});

export function updateIndex(newIndex) {
  return (dispatch, getState) => {
    let { totalFeatures } = getState().geojsonData;
    if (newIndex < 0) return null;
    if (totalFeatures >= newIndex && newIndex >= 0) {
      dispatch(setIndex(newIndex));
    } else {
      console.log('index out range');
    }
  };
}

export function fetchData(files) {
  return (dispatch) => {
    dispatch(fetchDataBegin());
    const fileReader = new FileReader();
    fileReader.onload = function (e) {
      const geojson = JSON.parse(fileReader.result);
      const total = (geojson.features || []).length;
      dispatch(fetchDataSuccess(geojson, validateFileName(files[0].name), total));
      dispatch(updateIndex(0));
      dispatch(fetchFeature(0, geojson, total));
    };
    fileReader.readAsText(files[0]);
  };
}

//  fetch feature

export function fetchFeature(index, data, totalFeatures) {
  return (dispatch) => {
    if (totalFeatures >= index && index >= 0) {
      dispatch(setFeature(data.features[index]));
    } else {
      console.log('index out range');
    }
  };
}

//  update data

export const UPDATE_FEATURE = 'UPDATE_FEATURE';
export const UPDATE_DATA = 'UPDATE_DATA';

export const updateData = (fData) => {
  return {
    type: UPDATE_DATA,
    payload: { fData }
  };
};

export function updateFeature(newFeature) {
  return (dispatch, getState) => {
    let { index, data, totalFeatures } = getState().geojsonData;
    data.features[index] = newFeature;
    dispatch(updateData(data));
    dispatch(fetchFeature(index, data, totalFeatures));
    dispatch(updateIndex(index + 1));
  };
}
