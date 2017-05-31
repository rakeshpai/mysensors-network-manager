export const generateId = () => Math.random().toString(36).substr(5);

const hexDigits = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'];
export const generateHexNumber = length => {
  return Array(length).fill(0).map(_ => hexDigits[Math.floor(Math.random() * hexDigits.length)]).join('');
}
