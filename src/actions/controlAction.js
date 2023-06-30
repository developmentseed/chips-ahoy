import { saveFile } from '../utils/utils';

export const DOWNLOAD_FILE_FAILED = 'DOWNLOAD_FILE_FAILED';
export const DOWNLOAD_FILE_SUCCESS = 'DOWNLOAD_FILE_SUCCESS';
export const DOWNLOAD_FILE_RESTART = 'DOWNLOAD_FILE_RESTART';

export const downloadFileRestart = () => {
  return {
    type: DOWNLOAD_FILE_RESTART
  };
};

export const downloadFileFailed = () => {
  return {
    type: DOWNLOAD_FILE_FAILED
  };
};

export const downloadFileSuccess = () => {
  return {
    type: DOWNLOAD_FILE_SUCCESS
  };
};

export const downloadFile = (data, filename) => {
  return (dispatch, getState) => {
    const { setup_data } = getState().annotationSeed;
    const { format, geojsonMetadara } = setup_data;
    dispatch(downloadFileRestart());

    if (!filename || !data) return null;

    try {
      const newData = data.map((feat) => {
        const prop_feats = Object.keys(feat.properties || {})
          .filter((i) => i.includes('prop_feature'))
          .map((i) => ({ key: `${i}`, value: feat.properties[i] }));

        const feat_cat = {
          sub_category: prop_feats.filter((j) => j.value).map((j) => j.key.split('__')[2]),
          category: [...new Set(prop_feats.filter((j) => j.value).map((j) => j.key.split('__')[1]))]
        };
        const new_feat = { ...feat, properties: { ...feat.properties, ...feat_cat } };
        return new_feat;
      });
      let dataOutput;
      if (format === 'geojson') {
        dataOutput = {
          type: 'FeatureCollection',
          ...geojsonMetadara,
          features: [...newData]
        };
      } else {
        dataOutput = [...newData];
      }

      const status = saveFile(dataOutput, filename);
      if (status) {
        dispatch(downloadFileSuccess());
      }
    } catch (error) {
      console.error(error);
    }
    dispatch(downloadFileFailed());
  };
};
