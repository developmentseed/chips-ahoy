export function makeChartData(data) {
  const { features } = data;

  if (!features) return null;
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
    { name: 'un review', value: features.length - yes - no - unrecognized }
  ];
}
