export const DOWNLOAD_FILE = 'DOWNLOAD_FILE';

export const downloadGeojsonFile = download => {
  return {
    type: DOWNLOAD_FILE,
    payload: { download }
  };
};
