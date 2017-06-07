import analogInput from './analog-input';

const registry = [];

export const register = descriptor => registry.push(descriptor);

analogInput(register);

const getVariableName = (sensor, sensors) => {
  const sensorsOfThisType = sensors.filter(s => s.type === sensor.type);

  if(sensorsOfThisType.length === 1) return sensor.variableName;
  return sensor.variableName + (sensorsOfThisType.findIndex(sensor) + 1);
}

export const getSensorLines = (network, nodeId) => {
  const node = network.nodes.find(n => n.id === nodeId);

  return node.sensors.reduce((lines, sensor) => {
    return [
      ...lines,
      // ...registry
      //   .find(r => r.type === sensor.type)
      //   .getLines(node, sensor, getVariableName(sensor, node.sensors))
    ];
  }, []);
}
