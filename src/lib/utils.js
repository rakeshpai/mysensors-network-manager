export const generateId = () => Math.random().toString(36).substr(5);

export const formatNumber = num => {
  // https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
