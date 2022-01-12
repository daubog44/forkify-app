import { TIMEOUT_SEC } from './confing.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(uploadData),
        })
      : await fetch(url);

    const request = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await request.json();

    if (request.ok === false)
      throw new Error(`${data.message} (${request.status})`);

    return data;
  } catch (err) {
    throw err;
  }
};
