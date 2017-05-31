// This shit is mad science!

import JSZip from 'jszip';
import { saveAs } from 'file-saver';

import { spFiles } from '../lib/constants';
import securityPersonalizer from './security-personalizer';
import nodeSketch from './node-sketch';

const arduinoFiles = ({ network, nodeId }) => {
  const sketchName = `Sketch-${nodeId}`;

  return [
    ...spFiles.map(file => {
      const fileContents = JSON.parse(window.localStorage.getItem(file.key)).text;

      return {
        path: `/${sketchName}/SecurityPersonalizer/${file.name}`,
        contents: (
          file.key === 'sp-ino'
          ? securityPersonalizer(network, nodeId, fileContents)
          : fileContents
        )
      }
    }),
    {
      path: `/${sketchName}/${sketchName}/${sketchName}.ino`,
      contents: nodeSketch({ network, nodeId })
    }
  ];
}

const pioFiles = _ => [];

export const serveSketch = ({ network, nodeId, format }) => {
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
