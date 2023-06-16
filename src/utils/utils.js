import jwt_decode from 'jwt-decode';

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
        .filter((i) => i.includes('prop_feature__'))
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
        .filter((i) => i.includes('prop_feature__'))
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
