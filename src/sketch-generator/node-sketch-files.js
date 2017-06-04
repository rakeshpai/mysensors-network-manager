import generateConfig from './generate-config-h';

const generateSketch = (nodeParams) => {
  return 'Hello world sketch';
};

export default (nodeParams, sketchName) => ([
  { name: 'config.h', contents: generateConfig(nodeParams) },
  { name: sketchName, contents: generateSketch(nodeParams) }
]);
