const generateConfig = ({ network, nodeId }) => {
  return 'Hello world config';
};

const generateSketch = ({ network, nodeId }) => {
  return 'Hello world sketch';
};

export default ({ network, nodeId }) => ([
  { name: 'config.h', contents: generateConfig({ network, nodeId }) },
  { name: 'Sketch.ino', contents: generateSketch({ network, nodeId }) }
]);
