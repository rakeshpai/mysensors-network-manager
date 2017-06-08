import { saveAs } from 'file-saver';

import { spFiles, nmFiles } from '../lib/constants';
import securityPersonalizer from './security-personalizer';
import nodeSketchFiles from './node-sketch-files';

const fileContents = ({ key }) => JSON.parse(window.localStorage.getItem(key)).text;

const arduinoFiles = (nodeParams) => {
  const sketchName = nodeParams.network.nodes.find(n => n.id === nodeParams.nodeId).name.trim();

  return [
    ...spFiles.map(file => ({
      path: `${sketchName}/SecurityPersonalizer/${file.name}`,
      contents: (
        file.key === 'sp-ino'
        ? securityPersonalizer(nodeParams, fileContents(file))
        : fileContents(file)
      )
    })),
    ...nmFiles.map(file => ({
      path: `${sketchName}/${sketchName}/${file.name}`,
      contents: fileContents(file)
    })),
    ...nodeSketchFiles(nodeParams, sketchName).map(file => ({
      path: `${sketchName}/${sketchName}/${file.name}`,
      contents: file.contents
    }))
  ];
}

const pioFiles = _ => [];

export default (nodeParams, format) => {
  return import('jszip').then(JSZip => {
    const zip = new JSZip();

    (
      format === 'arduino'
      ? arduinoFiles
      : pioFiles
    )(nodeParams)
      .forEach(({path, contents}) => zip.file(path, contents));

    return zip
      .generateAsync({type:"blob"})
      .then(content => saveAs(content, `${nodeParams.network.nodes.find(n => n.id === nodeParams.nodeId).name.trim()}-${nodeParams.nodeId}`));
  })
};
