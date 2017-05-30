import { spFiles } from './constants';

const constructPath = name => `https://raw.githubusercontent.com/mysensors/MySensors/development/examples/SecurityPersonalizer/${name}`
const oneDay = 1000 * 60 * 60 * 24;

const putFileInLocalStorage = (path, key) => {
  return fetch(path, { mode: 'cors' })
    .then(res => res.text())
    .then(text => window.localStorage.setItem(key, JSON.stringify({ date: Date.now(), text })));
}

const downloadIfNeeded = file => {
  return new Promise((resolve, reject) => {
    const existingData = window.localStorage.getItem(file.key);

    if(!existingData) return resolve(putFileInLocalStorage(constructPath(file.name), file.key));

    resolve();  // Indicate success to the world, but don't stop there...

    const { date } = JSON.parse(existingData);
    if(Date.now() - date < oneDay) return;  // If it's less than a day old, it's fine

    // Otherwise silently attempt to download the file
    putFileInLocalStorage(constructPath(file.name), file.key);
  })
}

export const cache = _ => Promise.all(spFiles.map(downloadIfNeeded));
