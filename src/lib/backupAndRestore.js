import { arduino, platformio }  from '../sketch-generator/files-by-format';

export const backup = (network, format) => {
  const fn = format === 'arduino' ? arduino : platformio;
  const root = `Network-${network.id}`;

  return import('../lib/file-utils').then(({ JSZip, saveAs }) => {
    const zip = new JSZip();

    const files = network.nodes.reduce((acc, node) => {
      return [
        ...acc,
        ...fn({network, nodeId: node.id}).map(({path, contents}) => ({
          path: `${root}/${path}`,
          contents
        }))
      ]
    }, [{
      path: `${root}/network.json`,
      contents: JSON.stringify(network, null, 2)
    }]);

    files.forEach(({path, contents}) => zip.file(path, contents));

    return zip
      .generateAsync({type:"blob"})
      .then(content => saveAs(content, `${root}`));
  });
}

export const restore = () => {
  // TODO: restore
}
