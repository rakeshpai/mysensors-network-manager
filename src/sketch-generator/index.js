import { arduino, platformio }  from './files-by-format';

export default (nodeParams, format) =>
  import('../lib/file-utils')
    .then(({ JSZip, saveAs }) => {
      const zip = new JSZip();
      (
        format === 'arduino'
        ? arduino
        : platformio
      )(nodeParams)
        .forEach(({path, contents}) => zip.file(path, contents));

      return zip
        .generateAsync({type:"blob"})
        .then(content => saveAs(content, `${nodeParams.network.nodes.find(n => n.id === nodeParams.nodeId).name.trim()}-${nodeParams.nodeId}`));
    })
