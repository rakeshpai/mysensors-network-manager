import sensorLines from './sensor-lines';

const getVariableSuffix = (sensor, sensors) => {
  const sensorsOfThisType = sensors.filter(s => s.type === sensor.type);

  if(sensorsOfThisType.length === 1) return '';
  return '' + (sensorsOfThisType.findIndex(s => s === sensor) + 1);
}

export const getSensorLines = (network, nodeId) => {
  const node = network.nodes.find(n => n.id === nodeId);

  return node.sensors.reduce((lines, sensor) => {
    return [
      ...lines,
      ...sensorLines(node, sensor, getVariableSuffix(sensor, node.sensors))
    ];
  }, []);
}
