export function validateFileName (fileName) {
  let newName = fileName.replace(/ /g, '').split('.').slice(0, -1).join('_');
  const ext = '.' + fileName.split('.').slice(-1)[0];
  // buscar si tiene numeros
  if (newName.includes('(')) { newName = newName.split('(').slice(0, -1).join('_'); }

  return newName + ext;
}
