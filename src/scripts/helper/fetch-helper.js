import CONFIG from '../globals/config';

/**
 *
 * @param {string} url
 * @return {object}
 */
const getData = async (url) => {
  const response = await fetch(url);
  return await checkResponse(response);
};

/**
 *
 * @param {string} url
 * @param {object} data
 * @return {object}
 */
const postData = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': CONFIG.AUTH_TOKEN,
    },
    body: JSON.stringify(data),
  });
  return await checkResponse(response);
};

/**
 *
 * @param {Response} response
 */
const checkResponse = async (response) => {
  if (response.ok) {
    return await response.json();
  }
  throw new Error('Terjadi kesalahan saat mengirim/menerima data.');
};

export {getData, postData};
