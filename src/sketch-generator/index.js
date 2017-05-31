// This shit is mad science!

import JSZip from 'jszip';
import { saveAs } from 'file-saver';

import { spFiles, nmFiles } from '../lib/constants';
import securityPersonalizer from './security-personalizer';
import nodeSketchFiles from './node-sketch-files';

const fileContents = ({ key }) => JSON.parse(window.localStorage.getItem(key)).text;

const arduinoFiles = ({ network, nodeId }) => {
  const sketchName = `Sketch-${nodeId}`;

  return [
    ...spFiles.map(file => ({
      path: `/${sketchName}/SecurityPersonalizer/${file.name}`,
      contents: (
        file.key === 'sp-ino'
        ? securityPersonalizer(network, nodeId, fileContents(file))
        : fileContents(file)
      )
    })),
    ...nmFiles.map(file => ({
      path: `/${sketchName}/${sketchName}/${file.name}`,
      contents: fileContents(file)
    })),
    ...nodeSketchFiles({ network, nodeId }).map(file => ({
      path: `/${sketchName}/${sketchName}/${file.name}`,
      contents: file.contents
    }))
  ];
}

const pioFiles = _ => [];

export default ({ network, nodeId, format }) => {
  const zip = new JSZip();  // Ugh! Objects!

  (
    format === 'arduino'
    ? arduinoFiles
    : pioFiles
  )({ network, nodeId }).forEach(({path, contents}) => zip.file(path, contents));

  zip
    .generateAsync({type:"blob"})
    .then(content => saveAs(content, `Sketch-${nodeId}`));
};
