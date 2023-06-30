import { PREFIX_FIELD } from '../utils/constants';
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

export const downloadFile = (data, filename, setup_data) => {
  return (dispatch) => {
    const { format, geojsonMetadara, fieldProperties } = setup_data;
    dispatch(downloadFileRestart());

    if (!filename || !data) return null;

    try {
      const newData = data.map((feat) => {
        let prop_feats;
        // custon field
        if (fieldProperties && fieldProperties !== '') {
          prop_feats = Object.keys(feat[fieldProperties] || {})
            .filter((i) => i.includes(PREFIX_FIELD))
            .map((i) => ({ key: `${i}`, value: feat[fieldProperties][i] }));
        } else {
          prop_feats = Object.keys(feat || {})
            .filter((i) => i.includes(PREFIX_FIELD))
            .map((i) => ({ key: `${i}`, value: feat[i] }));
        }

        const feat_cat = {
          sub_category: prop_feats.filter((j) => j.value).map((j) => j.key.split('__')[2]),
          category: [...new Set(prop_feats.filter((j) => j.value).map((j) => j.key.split('__')[1]))]
        };

        // custon field
        if (fieldProperties && fieldProperties !== '') {
          return { ...feat, [fieldProperties]: { ...feat_cat } };
        } else {
          return { ...feat, ...feat_cat };
        }
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
