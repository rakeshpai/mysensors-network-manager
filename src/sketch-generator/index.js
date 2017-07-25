import { arduino, platformio }  from './files-by-format';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export default (nodeParams, format) => {
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
}
