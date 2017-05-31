import { spFiles, spFilesRoot, nmFiles, nmFilesRoot } from './constants';

const oneDay = 1000 * 60 * 60 * 24;

const putFileInLocalStorage = ({ name, path, key }) => {
  return fetch(`${path}${name}`, { mode: 'cors' })
    .then(res => res.text())
    .then(text => window.localStorage.setItem(key, JSON.stringify({ date: Date.now(), text })));
}

const downloadIfNeeded = file => {
  return new Promise((resolve, reject) => {
    const existingData = window.localStorage.getItem(file.key);

    if(!existingData) return resolve(putFileInLocalStorage(file));

    resolve();  // Indicate success to the world, but don't stop there...

    const { date } = JSON.parse(existingData);
    if(Date.now() - date < oneDay) return;  // If it's less than a day old, it's fine

    // Otherwise silently attempt to download the file
    putFileInLocalStorage(file);
  });
}

const addPath = path => file => ({ ...file, path });

export default _ => Promise.all([
  ...spFiles.map(addPath(spFilesRoot)),
  ...nmFiles.map(addPath(nmFilesRoot))
].map(downloadIfNeeded));
