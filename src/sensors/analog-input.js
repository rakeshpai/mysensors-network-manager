export default register => {
  register({
    variableName: 'analogInput',
    type: 'analog',
    getLines: (node, sensor, variableName) => {
      return [];
    }
  })
}
