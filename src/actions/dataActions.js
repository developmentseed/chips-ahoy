import axios from 'axios';

import { filterProps, setIndexData } from '../utils/utils';
import { rangeImages, validateFileName } from '../utils/validate';

const { REACT_APP_API_URL } = process.env;

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
    let { totalFeatures } = getState().data;
    if (newIndex < 0) return null;
    if (totalFeatures >= newIndex && newIndex >= 0) {
      dispatch(setIndex(newIndex));
    } else {
      console.error('index out range');
    }
  };
}

const dataSuccess = (data, filename) => {
  return (dispatch) => {
    const newData = setIndexData(data);
    dispatch(fetchDataSuccess(newData, validateFileName(filename), newData.length));
    dispatch(updateIndex(0));
    dispatch(fetchFeature(0, newData, data.length));
  };
};

export function fetchData(files) {
  return (dispatch, getState) => {
    const { setup_data } = getState().annotationSeed;
    const { format } = setup_data;
    dispatch(fetchDataBegin());

    const fileReader = new FileReader();
    fileReader.onload = function () {
      let dataRaw = JSON.parse(fileReader.result);
      if (format === 'geojson') {
        dataRaw = [...dataRaw.features];
      }
      const filename = files[0].name;
      dispatch(dataSuccess(dataRaw, filename));
    };
    fileReader.readAsText(files[0]);
  };
}

export function fetchApiData(task_id) {
  return (dispatch, getState) => {
    const { setup_data } = getState().annotationSeed;
    const { format, extension } = setup_data;
    dispatch(fetchDataBegin());
    axios
      .get(`${REACT_APP_API_URL}/${task_id}/get_data`)
      .then(function (response) {
        let dataRaw = response.data;
        if (format === 'geojson') {
          dataRaw = [...dataRaw.features];
        }
        const filename = `task_${task_id}.${extension}`;
        dispatch(dataSuccess(dataRaw, filename));
      })
      .catch(function (error) {
        dispatch(fetchDataFailure(error.message));
      });
  };
}

//  fetch feature

export function fetchFeature(index, data, totalFeatures) {
  return (dispatch) => {
    if (totalFeatures >= index && index >= 0) {
      dispatch(setFeature(data[index]));
    } else {
      console.error('index out range');
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

export function updateFeature(newFeature, next_page = false) {
  return (dispatch, getState) => {
    const { index, data, totalFeatures } = getState().data;
    const { setup_data } = getState().annotationSeed;
    const { fieldProperties } = setup_data;
    const tmpNewFeature = { ...newFeature };

    if (fieldProperties && fieldProperties !== '') {
      tmpNewFeature[fieldProperties].__reviewed = true;
    } else {
      tmpNewFeature.__reviewed = true;
    }

    data[index] = tmpNewFeature;
    const newData = [...data];
    dispatch(updateData(newData));
    dispatch(fetchFeature(index, newData, totalFeatures));

    if (next_page) {
      dispatch(updateIndex(index + 1));
      dispatch(preloadImages(index, newData, totalFeatures));
    }
  };
}

// preload image

export const UPDATE_BUFFER = 'UPDATE_BUFFER';

export const updateBuffer = (buffer) => {
  return {
    type: UPDATE_BUFFER,
    payload: { buffer }
  };
};

export function preloadImages(index, data, totalFeatures) {
  return (dispatch, getState) => {
    const { setup_data } = getState().annotationSeed;
    const { fieldProperties } = setup_data;

    let { start, end } = rangeImages(index);
    if (end >= totalFeatures) {
      end = totalFeatures;
    }
    const data_tmp = data.slice(start, end);
    let gridImagesDiv = [];
    for (var [i, geo] of data_tmp.entries()) {
      try {
        let img = new Image();
        if (fieldProperties && fieldProperties !== '') {
          geo = { ...geo[fieldProperties] };
        }
        img.src = geo.url;
        img.id = `${geo.url}`;
        img.key = `${geo.url}`;

        if (geo.tiles_neighbors) {
          for (var [keyTiNe, valueTiNe] of Object.entries(geo.tiles_neighbors)) {
            let img_ti_ne = new Image();
            img_ti_ne.src = valueTiNe;
            img_ti_ne.id = `img_${valueTiNe}`;
            img_ti_ne.alt = `img_${geo.url}__${keyTiNe}`;
            gridImagesDiv.push(img_ti_ne);
          }
        }
        gridImagesDiv.push(img);
        dispatch(updateBuffer(start + i));
      } catch (error) {
        console.error(error);
      }
    }
  };
}

// filter data
export const UPDATE_FILTER = 'UPDATE_FILTER';
export const RESET_FILTER = 'RESET_FILTER';

export const updateFilter = (payload) => {
  return {
    type: UPDATE_FILTER,
    payload
  };
};

export const resetFilter = () => {
  return {
    type: RESET_FILTER
  };
};

export function setFilter(filter) {
  return (dispatch) => {
    try {
      dispatch(updateFilter(filterProps(filter)));
    } catch (error) {
      console.error(error);
      dispatch(resetFilter());
    }
  };
}
