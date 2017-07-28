import { spFiles, nmFiles } from '../lib/constants';
import securityPersonalizer from './security-personalizer';
import nodeSketchFiles from './node-sketch-files';
import platformioIni from './platformioini';

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

export const arduino = nodeParams => {
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

export const platformio = nodeParams => {
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
      contents: platformioIni({ ...nodeParams, isSecurityPersonalizer: true })
    },
    ...nodeSketchFiles(nodeParams, sketchName).map(file => ({
      path: `${sketchName}/${sketchName}/src/${file.name}`,
      contents: file.contents
    })),
    {
      path: `${sketchName}/${sketchName}/platformio.ini`,
      contents: platformioIni({ ...nodeParams, isSecurityPersonalizer: false })
    }
  ]
};
