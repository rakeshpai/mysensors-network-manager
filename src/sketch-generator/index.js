// This shit is mad science!

import JSZip from 'jszip';
import { saveAs } from 'file-saver';

import { spFiles } from '../lib/constants';
import securityPersonalizer from './security-personalizer';

export const serveSketch = (network, nodeId) => {
  const zip = new JSZip();  // Ugh! Objects!

  const spFolder = zip.folder('SecurityPersonalizer');

  spFiles.forEach(file => { // Ugh! forEach! Because Objects! Objects are bad, kids!
    const { text } = JSON.parse(window.localStorage.getItem(file.key));

    if(file.key !== 'sp-ino') spFolder.file(file.name, text);
    spFolder.file(file.name, securityPersonalizer(network, nodeId, text));
  });

  zip
    .generateAsync({type:"blob"})
    .then(function(content) {
        saveAs(content, "example.zip");
    });
}
