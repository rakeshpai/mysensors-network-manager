import { spFiles, nmFiles } from './constants';

const expiryTime = 1000 * 60 * 60 * 24; // 1 day

const download = ({ name, path, key }) => fetch(`${path}${name}`)
  .then(res => {
    if(res.status >= 200 && res.status < 300) return res;

    const err = new Error(res.statusText);
    err.response = res;
    throw err;
  })
  .then(res => res.text())
  .then(text => window.localStorage.setItem(key, JSON.stringify({ date: Date.now(), text })));

const downloadIfNeeded = file => new Promise((resolve, reject) => {
  const existingData = window.localStorage.getItem(file.key);

  if(!existingData) return resolve(download(file));

  resolve();  // Indicate success to the world, but don't stop there...

  const { date } = JSON.parse(existingData);
  if(Date.now() - date < expiryTime) return;  // If it's less than the expiry time, it's fine

  // Otherwise attempt to re-download the file in the background
  download(file);
});

export default _ => Promise.all([ ...spFiles, ...nmFiles ].map(downloadIfNeeded));
