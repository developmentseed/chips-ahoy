export function validateFileName(fileName) {
  let newName = fileName.replace(/ /g, '').split('.').slice(0, -1).join('_');
  const ext = '.' + fileName.split('.').slice(-1)[0];
  // buscar si tiene numeros
  if (newName.includes('(')) {
    newName = newName.split('(').slice(0, -1).join('_');
  }

  return newName + ext;
}

export function rangeImages(index, range = 35) {
  if (index <= range) {
    if (index >= range / 2) {
      return { start: index - 5, end: range + 5 };
    }
    return { start: index, end: range + 5 };
  }

  return { start: index - 5, end: index + range - 5 };
}
