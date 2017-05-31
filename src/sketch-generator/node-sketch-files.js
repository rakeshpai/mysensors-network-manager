import generateConfig from './generate-config-h';

const generateSketch = (nodeParams) => {
  return 'Hello world sketch';
};

export default (nodeParams) => ([
  { name: 'config.h', contents: generateConfig(nodeParams) },
  { name: 'Sketch.ino', contents: generateSketch(nodeParams) }
]);
