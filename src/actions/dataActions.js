import { validateFileName } from '../utils/validate';

export const FETCH_DATA_BEGIN = 'FETCH_DATA_BEGIN';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';
export const SET_INDEX = 'SET_INDEX';

export const fetchDataBegin = () => ({
  type: FETCH_DATA_BEGIN
});

export const fetchDataSuccess = (fData, fileName, totalFeatures) => {
  return {
    type: FETCH_DATA_SUCCESS,
    payload: { fData, fileName, totalFeatures }
  };
};

export const fetchDataFailure = error => ({
  type: FETCH_DATA_FAILURE,
  payload: { error }
});

export const setIndex = index => ({
  type: SET_INDEX,
  payload: { index }
});



export function fetchData(files) {
  return dispatch => {
    dispatch(fetchDataBegin());
    const fileReader = new FileReader();
    fileReader.onload = function (e) {
      const geojson = JSON.parse(fileReader.result);
      const total = (geojson.features || []).length
      dispatch(fetchDataSuccess(geojson, validateFileName(files[0].name), total));
      dispatch(setIndex(0));
      dispatch(fetchFeature(0, geojson, total));

    };
    fileReader.readAsText(files[0]);
  };
}


//  fetch feature
export const SET_FEATURE = 'SET_FEATURE';

export const setFeature = feature => ({
  type: SET_FEATURE,
  payload: { feature }
});

export function fetchFeature(index, data, totalFeatures) {
  return dispatch => {
    if (totalFeatures >= index && index >= 0) {
      dispatch(setFeature(data.features[index]))
    } else {
      console.log('index out range')
    }
  };
}

//  update data

export const UPDATE_FEATURE = 'UPDATE_FEATURE';
export const UPDATE_DATA = 'UPDATE_DATA';

export const updateData = fData => {
  return {
    type: UPDATE_DATA,
    payload: { fData }
  };
};

export const updateFeature = (feature) => {
  return {
    type: UPDATE_FEATURE,
    payload: { feature }
  };
};

