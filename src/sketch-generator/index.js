import { saveAs } from 'file-saver';

import JSZip from 'jszip';
import { spFiles, nmFiles } from '../lib/constants';
import securityPersonalizer, { platformini as spPlatformini } from './security-personalizer';
import nodeSketchFiles, { platformini as nodePlatformini } from './node-sketch-files';

const fileContents = ({ key }) => JSON.parse(window.localStorage.getItem(key)).text;

const readme = `
Instructions to flash your node:

tl;dr:
* Flash the SecurityPersonalizer to your node first.
* Then flash the main sketch next.

Details:
Flashing the SecurityPersonalizer sketch to your node prepares it for signing
and encryption. It writes the necessary security keys to your node's EEPROM
(in case of software signing) or to the ATSHA204 (in case you are using the
ATSHA204 chip). This ensures that your sensor data isn't visible to your
neighbours, and that snoopers can't snoop.
`.trim();

const arduinoFiles = nodeParams => {
  const sketchName = nodeParams.network.nodes.find(n => n.id === nodeParams.nodeId).name.trim();

  return [
    {
      path: `${sketchName}/README.md`,
      contents: readme
    },
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

const pioFiles = nodeParams => {
  const sketchName = nodeParams.network.nodes.find(n => n.id === nodeParams.nodeId).name.trim();

  return [
    {
      path: `${sketchName}/README.md`,
      contents: readme
    },
    ...spFiles.map(file => ({
      path: `${sketchName}/SecurityPersonalizer/src/${file.name}`,
      contents: (
        file.key === 'sp-ino'
        ? securityPersonalizer(nodeParams, fileContents(file))
        : fileContents(file)
      )
    })),
    {
      path: `${sketchName}/SecurityPersonalizer/platformio.ini`,
      contents: spPlatformini()
    },
    ...nmFiles.map(file => ({
      path: `${sketchName}/${sketchName}/src/${file.name}`,
      contents: fileContents(file)
    })),
    ...nodeSketchFiles(nodeParams, sketchName).map(file => ({
      path: `${sketchName}/${sketchName}/src/${file.name}`,
      contents: file.contents
    })),
    {
      path: `${sketchName}/${sketchName}/platformio.ini`,
      contents: nodePlatformini(nodeParams)
    }
  ]
};

export default (nodeParams, format) => {
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
};
