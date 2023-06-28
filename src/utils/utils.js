import { saveAs } from 'file-saver';
import jwt_decode from 'jwt-decode';

import { PREFIX_FIELD } from './constants';

export function makeChartData(data) {
  if (!data) return null;
  const { features } = data;
  if (features.length === 0) return null;
  var yes = 0;
  var no = 0;
  var unrecognized = 0;
  for (let index = 0; index < features.length; index++) {
    const element = features[index];
    if (element.properties && element.properties.dc_has_pattern_school) {
      switch (element.properties.dc_has_pattern_school) {
        case 'yes':
          yes++;
          break;
        case 'no':
          no++;
          break;
        case 'unrecognized':
          unrecognized++;
          break;
        default:
          break;
      }
    }
  }
  return [
    { name: 'yes', value: yes },
    { name: 'no', value: no },
    { name: 'unrecognized', value: unrecognized },
    { name: 'unreviewed', value: features.length - yes - no - unrecognized }
  ];
}

export function getNextIndex(index, features) {
  var newIndex = index + 1;
  var has_modifications = false;

  try {
    if (features.length <= newIndex) return index;
    while (newIndex < features.length) {
      const properties = features[newIndex].properties;
      const has_field = Object.keys(properties)
        .filter((i) => i.includes(`${PREFIX_FIELD}__`))
        .some((j) => properties[j]);
      if (has_field) {
        has_modifications = true;
        break;
      }
      newIndex++;
    }
  } catch (error) {
    console.error(error);
  }
  return has_modifications ? newIndex : index;
}

export function getPrevIndex(index, features) {
  var newIndex = index - 1;
  var has_modifications = false;

  try {
    if (newIndex < 0) return index;

    while (newIndex >= 0) {
      const properties = features[newIndex].properties;
      const has_field = Object.keys(properties)
        .filter((i) => i.includes(`${PREFIX_FIELD}__`))
        .some((j) => properties[j]);
      if (has_field) {
        has_modifications = true;
        break;
      }
      newIndex--;
    }
  } catch (error) {
    console.error(error);
  }
  return has_modifications ? newIndex : index;
}

export function decodeToken(token_url) {
  if (!token_url) return null;
  try {
    const decoded = jwt_decode(token_url);
    return decoded;
  } catch (error) {
    console.error(error);
  }
  return null;
}

export function object2list(classes_annotate) {
  // 2D -> 1D
  if (!classes_annotate) {
    return [];
  }
  try {
    return Object.keys(classes_annotate)
      .sort()
      .map((i) => classes_annotate[i].map((j) => `${PREFIX_FIELD}__${i}__${j}`))
      .flat();
  } catch (error) {
    console.error(error);
  }
}

export function saveFile(dataUpdate, fileName) {
  try {
    const blob = new Blob([JSON.stringify(dataUpdate)], {
      type: 'application/json;charset=utf-8'
    });
    saveAs(blob, fileName);
    return true;
  } catch (error) {
    console.error(error);
  }
  return false;
}

export const fakeFilename = (fileName) => {
  if (!fileName) return '';
  try {
    fileName = fileName.split('.');
    return `${fileName[0].slice(0, 20)}....${fileName[1]}`;
  } catch (error) {
    return fileName;
  }
};

export const filterDataDict = (data, field, filters) => {
  console.log(field, filters);

  if (!data || !data.length) return [];
  if (!filters || Object.keys(filters).length === 0) return [];

  const newData = data.filter((item) => {
    if (field) {
      item = { ...item[field] };
    }
    for (var key in filters) {
      if (item[key] === filters[key] && item[key]) return true;
    }
    return false;
  });

  return newData;
};

export const filterProps = (props) => {
  let newProps = {};

  for (var [key, val] of Object.entries(props)) {
    if (val && key.includes(PREFIX_FIELD)) {
      newProps[key] = val;
    }
  }
  return newProps;
};

export const fixPropName = (propName) => {
  if (!propName) return propName;
  return propName
    .replace(`${PREFIX_FIELD}__`, '')
    .replaceAll('_', ' ')
    .replaceAll('-', ' ')
    .replaceAll('  ', ' ')
    .trim();
};
